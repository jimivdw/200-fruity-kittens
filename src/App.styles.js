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
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#ebebeb'
  },
  loginHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff6200',
    height: 150,
    padding: 20,
    color: 'white',
    fontSize: 15,
  },
  logo: {
    width: 80,
    height: 80,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ff6200',
    height: 64,
    padding: 16,
    color: 'white',
    fontSize: 16,
  },
  icon: {
    width: 32,
    height: 32,
    flex: 0,
    marginRight: 16
  },
  title: {
    fontSize: '1.4em',
    flex: 1,
    textAlign: 'left'
  },
  content: {
    flex: 1,
    padding: 16
  }
};

export {
  styles
};
