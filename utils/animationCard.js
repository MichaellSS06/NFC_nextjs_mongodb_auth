// Función debounce para animar uno por uno
export const staggeredAnimation = (i) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.5, duration: 0.6 }, // 👈 1s por tarjeta
  },
});