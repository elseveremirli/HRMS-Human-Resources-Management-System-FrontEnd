import React, { useState, useCallback, useContext } from 'react';
import { Menu, Container, Popup, Button, Header, Divider, Image, Dropdown } from 'semantic-ui-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './navigation.css';
import { UserContext } from '../../contexts/UserProvider';

const Navigation = () => {
  const [activeItem, setActiveItem] = useState('home');
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleItemClick = useCallback((e, { name }) => {
    setActiveItem(name);
  }, []);

  const renderLoginButtons = () => {
    if (user) {
      return (
        <Menu.Menu position="right">
          <Dropdown
            item
            text={user.data?.firstName}
            style={{ fontWeight: 'bold' }}>
            <Dropdown.Menu>
              {user.data?.userStatu?.typeId === 1 && (
                <Dropdown.Item as={Link} to={`/employerProfile/${user.data?.id}`} text="Profile" icon="info" />
              )}
              {user.data?.userStatu?.typeId === 2 && (
                <Dropdown.Item as={Link} to={`/profile/${user.data?.id}`} text="Profile" icon="info" />
              )}
              <Dropdown.Item as={Link} to="/home" onClick={logout} text="Logout" icon="power off" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      );
    } else {
      return (
        <Menu.Menu position="right">
          <Popup
            trigger={<Button content="Sign Up / Login" color="red" />}
            on="click"
            position="bottom center"
            hideOnScroll
          >
            <Popup.Content>
              <Header as="h5">Are you looking for a job?</Header>
              <Button.Group>
                <Button inverted color="red" as={Link} to="/jobSeekerLogin">
                  Login
                </Button>
                <Button color="red" as={Link} to="/jobSeekerSignUp">
                  Sign Up
                </Button>
              </Button.Group>
              <Divider horizontal>OR</Divider>
              <Header as="h5">Are you an employer?</Header>
              <NavLink to="/employerLogin" style={{ color: "red" }}>
                Login as an Employer
              </NavLink>
              <br />
              <NavLink to="/employer" style={{ color: "red" }}>
                Sign Up as an Employer
              </NavLink>
            </Popup.Content>
          </Popup>
        </Menu.Menu>
      );
    }
  };



  return (
    <div>
      <Menu secondary inverted color='red'>
        <Container>
          <Menu.Item>
            <Link to="/home" style={{ fontWeight: 'bold' }}>elseveremirli</Link>
          </Menu.Item>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={handleItemClick}>
            <NavLink exact to="/home" style={{ fontWeight: 'bold' }}>Home</NavLink>
          </Menu.Item>
          <Menu.Item name='jobAdvertisementSearchList' active={activeItem === 'jobAdvertisementSearchList'} onClick={handleItemClick}>
            <NavLink to="/jobAdvertisementSearchList" style={{ fontWeight: 'bold' }}>Job Advertisements</NavLink>
          </Menu.Item>
          <Menu.Item position='right'>
            {renderLoginButtons()}
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}

export default Navigation;