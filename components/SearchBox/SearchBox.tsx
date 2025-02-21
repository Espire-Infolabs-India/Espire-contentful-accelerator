import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchBox = ()=> {   
  return (
    <div className={`search-bar-default`}>
      <div className="search-bar">
        <InputGroup>
          <Button variant="outline-secondary" id="search-btn">
            <i className="fa fa-search"></i>
          </Button>
          <Form.Control
            aria-label="search bar"
            aria-describedby="seacrh-bar"
            placeholder="Search"
          />
        </InputGroup>
      </div>
    </div>
  );
};

export const SearchIcon = ()=> {
  return (
    <div className={`footer-search-bar`}>
      <div className="search-bar">
        <InputGroup>
          <Button variant="outline-secondary" id="search-btn">
            <i className="fa fa-search"></i>
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default SearchBox;