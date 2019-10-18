import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const UserForm = ({ values, touched, errors, status }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    status && setUsers(users => [...users, status]);
  }, [status]);
  return (
    <div className="user-form">
      <Form>
        <Field type="text" name="name" placeholder="Enter Name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}
        <br />
        <Field type="text" name="email" placeholder="Enter Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <br />
        <Field type="text" name="password" placeholder="Enter Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <br />
        <label>
          TOS
          <Field type="checkbox" name="terms" checked={values.terms} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </Form>
      {users.map(person => (
        <ul key={person.id}>
          <li>Name: {person.name}</li>
          <li>Email: {person.email}</li>
        </ul>
      ))}
    </div>
  );
};
const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Enter name, fool!")
      .min(3),
    email: Yup.string()
      .required("Enter email, dummy!")
      .min(7),
    password: Yup.string()
      .required("Enter password, assword!")
      .min(8),
    terms: Yup.boolean().oneOf([true])
  }),
  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);

export default FormikUserForm;
