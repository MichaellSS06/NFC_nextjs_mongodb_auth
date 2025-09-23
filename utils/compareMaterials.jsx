const normalize = (s) => (s || "").toLowerCase().replace(/\s+/g, "");

export function compareMaterials(registros, materiales, subestacion) {
    if (!registros?.length) return [];

    // Filtrar por subestación
    const subFilter = normalize(subestacion); 
    const registrosFiltrados = registros.filter((r) =>
      r.subestacion?.toLowerCase().includes(subFilter.toLowerCase())
    );

    // Si no hay registros en la subestación
    if (!registrosFiltrados.length) return [];

    // Recorrer materiales actuales
    return materiales
      .map((matEstado) => {
        const keyEstado = normalize(matEstado.nombre);

        // Buscar todos los registros que incluyan el nombre
        const posibles = [];
        for (const registro of registrosFiltrados) {
          const fechaTS = registro?.date ? new Date(registro.date).getTime() : 0;

          for (const mat of registro.materiales || []) {
            const keyReg = normalize(mat.nombre);
            if (keyReg.includes(keyEstado) || keyEstado.includes(keyReg)) {
              posibles.push({
                registro,
                material: mat,
                fechaTS,
              });
            }
          }
        }

        if (!posibles.length) return null; // ignorar materiales sin historial

        // Seleccionar el más reciente
        const latest = posibles.reduce(
          (acc, cur) => (cur.fechaTS > acc.fechaTS ? cur : acc),
          posibles[0]
        );

        const cantidadRegistro = Number(latest.material.cantidad ?? 0);
        const cantidadActual = Number(matEstado.cantidad ?? 0);
        const diferencia = cantidadRegistro - cantidadActual;

        if (diferencia > 0) {
          return {
            nombre: matEstado.nombre,
            status: "increased",
            mensaje: `Disminuyó en ${diferencia}`,
            cantidadRegistro,
            cantidadActual,
            fecha: latest.registro.date,
          };
        } else if (diferencia < 0) {
          return {
            nombre: matEstado.nombre,
            status: "decreased",
            mensaje: `Aumentó en ${Math.abs(diferencia)}`,
            cantidadRegistro,
            cantidadActual,
            fecha: latest.registro.date,
          };
        } 
        // else {
        //   return {
        //     nombre: matEstado.nombre,
        //     status: "equal",
        //     mensaje: `Se mantiene igual (${cantidadActual})`,
        //     cantidadRegistro,
        //     cantidadActual,
        //     fecha: latest.registro.date,
        //   };
        // }
      })
      .filter(Boolean); // quitar los que no tienen historial
}
