import React from 'react';
import logo from '../../assets/sellurbike.png'
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className='min-w-screen min-h-screen bg-[#c9c4f4] flex justify-center items-center' >
      <div className='w-[450px] text-[#ffffff] p-2'>
        <div className='bg-[#6f68d1] p-4 rounded-md'>
          <img src={logo} alt='SellURBike' className='mx-auto' />
          <h2 className='text-xl mb-3 font-bold text-center'>Bienvenido a SellURBike</h2>
          <form>
            <div className='mb-4'>
              <label htmlFor='nombre' className='block text-sm font-medium text-white'>Nombre</label>
              <input type='text' name='name' id='name' className='w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:bg-white' />
            </div>
            <div className='mb-4'>
              <label htmlFor='apellidos' className='block text-sm font-medium text-white'>Apellidos</label>
              <input type='text' name='surname' id='surname' className='w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:bg-white' />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm font-medium text-white'>Correo Electrónico</label>
              <input type='email' name='email' id='email' className='w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:bg-white' />
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='block text-sm font-medium text-white'>Contraseña</label>
              <input type='password' name='password' id='password' className='w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:bg-white' />
            </div>
            <div className='mb-4'>
              <label htmlFor='confirmPassword' className='block text-sm font-medium text-white'>Confirmar Contraseña</label>
              <input type='password' name='confirmPassword' id='confirmPassword' className='w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:bg-white' />
            </div>
            <div>
              <label htmlFor='terms' className='inline-flex items-center mb-4'>
                <input type='checkbox' name='terms' id='terms' className='rounded border-gray-300 text-[#6f68d1] shadow-sm focus:ring-[#6f68d1] focus:ring-offset-[#6f68d1] focus:ring-offset-2 focus:ring focus:outline-none' />
                <span className='ml-2 text-sm text-white'>Acepto los <a href='#' className='text-[#000000]'>Términos de Servicio</a> y la <a href='#' className='text-[#000000]'>Política de Privacidad</a></span>
              </label>
            </div>
            <button type='submit' className='w-full py-2 px-4 bg-[#161271] text-white rounded-md hover:bg-[#6f68d1] focus:outline-none focus:ring focus:ring-indigo-100 focus:bg-white'>Registrarse</button>
            <div>
              <p className='text-center mt-4 text-white'>¿Ya tienes una cuenta? <Link to='/login' className='text-[#000000]'>Inicia Sesión</Link></p>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
}
export default Register;