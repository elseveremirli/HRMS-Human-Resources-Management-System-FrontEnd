import React, { useEffect, useState } from 'react'
import { Checkbox, Divider, Dropdown, Menu } from 'semantic-ui-react'
import SectorService from '../../services/sectorService';
import CityService from '../../services/cityService';


export default function SideMenu() {

  const [cities, setCities] = useState([]);
  const [sectors, setSectors] = useState([]);

  let cityService = new CityService();
  let sectorService = new SectorService();

  useEffect(() => {
    cityService.getAllCity().then((result) => setCities(result.data.data));
    sectorService.getSectors().then((result) => setSectors(result.data.data));
  }, []);

  const sectorOptions = sectors.map((sector) => ({
    key: sector.id,
    text: sector.sector,
    value: sector,
  }));

  const cityOptions = cities.map((city) => ({
    key: city.id,
    text: city.cityName,
    value: city,
  }));

  return (
    <Menu vertical style={{ marginTop: "2em" }}>
      <Menu.Item>
        <Menu.Header>City</Menu.Header>
        <Menu.Menu>
          <Dropdown 
          placeholder='choose city' 
          selection options={cityOptions} 
          style={{ margin: "0.5em" }} />
        </Menu.Menu>
      </Menu.Item>
      <Divider clearing />
      <Menu.Item>
        <Menu.Header>Work Place</Menu.Header>
        <Menu.Menu vertical style={{ margin: "0.5em" }}>
          <Checkbox label='work from home' /><br />
          <Checkbox label='hybrid' /><br />
          <Checkbox label='at the workplace' /><br />
        </Menu.Menu>
      </Menu.Item>
      <Divider clearing />
      <Menu.Item>
        <Menu.Header>Sector</Menu.Header>
        <Menu.Menu>
          <Dropdown 
          placeholder='choose sector' 
          selection 
          style={{ margin: "0.5em" }}
          options={sectorOptions} />
        </Menu.Menu>
      </Menu.Item>
      <Divider clearing />
      <Menu.Item>
        <Menu.Header>Work Type</Menu.Header>
        <Menu.Menu vertical style={{ margin: "0.5em" }}>
          <Checkbox label='full time' /><br />
          <Checkbox label='period/project based' /><br />
          <Checkbox label='intern' /><br />
        </Menu.Menu>
      </Menu.Item>
      <Divider clearing />
      <Menu.Item>
        <Menu.Header>Education</Menu.Header>
        <Menu.Menu vertical style={{ margin: "0.5em" }}>
          <Checkbox label='postgraduate, graduate' /><br />
          <Checkbox label='bachelor level,graduate' /><br />
          <Checkbox label='associate Degree' /><br />
        </Menu.Menu>
      </Menu.Item>
      <Divider clearing />
    </Menu>
  )
}
