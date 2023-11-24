import Part from "./Part";
const Content = (props) => {
  return (
    <div>
      <Part part={props.part[0]} exercise={props.exercise[0]} />
      <Part part={props.part[1]} exercise={props.exercise[1]} />
      <Part part={props.part[2]} exercise={props.exercise[2]} />
    </div>
  );
};
export default Content;
