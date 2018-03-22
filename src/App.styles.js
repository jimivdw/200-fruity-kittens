const logoAnimationId = `app-${Math.random().toString().slice(2)}`;

const styles = {
  app: {
    textAlign: 'center',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
  },
  header: {
    background: 'linear-gradient(to bottom, rgba(125,126,125,1) 0%,rgba(14,14,14,1) 100%)',
    height: 150,
    padding: 20,
    color: 'white',
    fontSize: 15,
  },
  logo: {
    width: 70,
    height: 70,
  },
  title: {
    fontSize: '1.5em',
  },
};

export {
  styles
};
