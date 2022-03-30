import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
      <footer className={classes.footer}>Design & Developed By: Jawed Ahmed Khakhrani</footer>
    </div>
    
  );
}

export default Layout;
