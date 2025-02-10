import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
export default function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const responce = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!responce.ok) {
        throw new Error('Could not create a new user');
      }
      if (responce.status === 200) {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="w-50 mt-0 mb-0 ms-auto me-auto"
    >
      <Form.Group className="mb-3">
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
          className="form-control"
          placeholder="Enter your Email"
          type="text"
          {...register('username', {
            required: true,
          })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          className="form-control"
          placeholder="Enter your Email"
          type="email"
          {...register('email', {
            required: true,
          })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">Password</Form.Label>
        <Form.Control
          placeholder="Enter your password"
          type="password"
          {...register('password', {
            required: true,
          })}
        />
      </Form.Group>
      <Button type="submit">Register</Button>
    </Form>
  );
}
