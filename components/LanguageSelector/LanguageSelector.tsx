import Form from "react-bootstrap/Form";

const LanguageSelector = () => {
  return (
    <div className="LanguageSelector">
      <Form.Select className="bg-white text-gray-700 rounded px-4 py-2">
        <option>Select Language</option>
        <option value="1">English</option>
        <option value="2">French</option>
        <option value="3">German</option>
      </Form.Select>
    </div>
  );
};

export default LanguageSelector;
