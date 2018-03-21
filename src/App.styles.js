const logoAnimationId = `app-${Math.random().toString().slice(2)}`;

const styles = {
  wrapper: {
    textAlign: 'center',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
  },
  header: {
    backgroundColor: '#222',
    height: '150px',
    padding: '20px',
    color: 'white',
  },
  logo: {
    animation: `${logoAnimationId} infinite 20s linear`,
    height: '80px',
  },
  title: {
    fontSize: '1.5em',
  },
  [`@keyframes ${logoAnimationId}`]: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
};

export {
  styles
};