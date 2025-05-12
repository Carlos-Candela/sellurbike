import React, { useState } from 'react';
import UserHeader from '../../layout/UserHeader';
import UserSidebar from '../../layout/UserSidebar';
import UserMobileSidebar from '../../layout/UserMobileSidebar';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        phone: "",
        province: "",
        postalCode: "",
        city: "",
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [profileImage, setProfileImage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleImageUpload = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmitProfile = () => {
        // Logic to update profile data
        console.log("Profile updated", formData);
    };

    const handleChangePassword = () => {
        // Logic to change password
        console.log("Password changed", passwordData);
    };

    return (
        <div>
            <UserHeader />
      <div className="flex">
        <div className="hidden sm:block">
          <UserSidebar />
        </div>
        <div className="w-full p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
                <h2 className="text-2xl font-bold mb-4">Perfil</h2>

                {/* Profile Image Section */}
                <div className="flex items-center mb-6">
                    <img
                        src={profileImage ? URL.createObjectURL(profileImage) : "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full shadow-md mr-4"
                    />
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="profileImageInput"
                        />
                        <label
                            htmlFor="profileImageInput"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600"
                        >
                            Cambiar Imagen
                        </label>
                    </div>
                </div>

                {/* Personal Information Section */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Información Personal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Nombre"
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Dirección"
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="province"
                            value={formData.province}
                            onChange={handleInputChange}
                            placeholder="Provincia"
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            placeholder="Código Postal"
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Población"
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Correo Electrónico"
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Teléfono"
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                    </div>
                    <button
                        onClick={handleSubmitProfile}
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Guardar Cambios
                    </button>
                </div>

                {/* Change Password Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Cambiar Contraseña</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="password"
                            name="oldPassword"
                            value={passwordData.oldPassword}
                            onChange={handlePasswordChange}
                            placeholder="Contraseña Antigua"
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        <input
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="Nueva Contraseña"
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="Confirmar Nueva Contraseña"
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                    </div>
                    <button
                        onClick={handleChangePassword}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Cambiar Contraseña
                    </button>
                </div>
            </div>
        </div>
        </div>
        <UserMobileSidebar />
        </div>
    );
};

export default Profile;