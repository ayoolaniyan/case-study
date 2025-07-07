import Navbar from "../NavBar/NavBar";

interface Props {
    title: string;
}

const Header = (props: Props) => {
  return (
    <header className="header">
      <a href="#" className="logo">{props.title}</a>
      <Navbar/>
      <button className="btn-mobile-nav">
        {/* <FontAwesomeIcon icon={faCancel} className="icon-mobile-nav" name="menu-outline" /> */}
        <a className="icon-mobile-nav">MENU</a>
      </button>
    </header>
  );
};

export default Header;


