import {useEffect, useState} from "react";
export default function useFormState (data: any) {
  const [state, setState] = useState(data);

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  function handleChange (e: any) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  function handleChecked (e: any) {
    const {name, value, checked} = e.target;
    const values = new Set(state[name]);
    const intValue = parseInt(value, 10);

    values.delete(intValue);
    if (checked) values.add(intValue);

    setState({
      ...state,
      [name]: [...values]
    });
  }

  return {
    state,
    handleChange,
    handleChecked
  };
}