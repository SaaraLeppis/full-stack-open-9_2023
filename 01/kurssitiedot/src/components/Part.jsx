const Part = (props) => {
  console.log(props.part, "part");
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};
export default Part;
