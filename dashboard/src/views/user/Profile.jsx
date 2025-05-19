import React, { useEffect, useState } from "react";
import UserHeader from "../../layout/UserHeader";
import UserSidebar from "../../layout/UserSidebar";
import UserMobileSidebar from "../../layout/UserMobileSidebar";
import { useSelector, useDispatch } from "react-redux";
import {profile_data_change,  profile_image_upload,  messageClear} from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    address: "",
    email: "",
    phone: "",
    province: "",
    postalCode: "",
    city: "",
    image: "",
    state: "",
    payment: "",
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        surname: userInfo.surname || "",
        address: userInfo.address || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
        province: userInfo.province || "",
        postalCode: userInfo.postalCode || "",
        city: userInfo.city || "",
        image: userInfo.image || null,
        state: userInfo.status || "",
        payment: userInfo.payment || "",
      });
      setProfileImage(formData.image);
    }
  }, [userInfo]);

  const [passwordData, setPasswordData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleImageUpload = (e) => {
    if (e.target.files.length > 0) {
      const imageData = new FormData();
      imageData.append("image", e.target.files[0]);
      dispatch(profile_image_upload(imageData));
    }
  };

  const handleSubmitProfile = () => {
    const userData = new FormData();
    userData.append('name', formData.name )
    userData.append('surname', formData.surname )
    userData.append('address', formData.address )
    userData.append('province', formData.province )
    userData.append('postalCode', formData.postalCode )
    userData.append('city', formData.city )
    userData.append('phone', formData.phone )
    dispatch(profile_data_change(userData));
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
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6 mb-20">
            <h2 className="text-2xl font-bold mb-4">Perfil</h2>

            {/* Profile Image Section */}
            <div className="flex items-center mb-6 relative">
  <div className="relative">
  <img
    src={formData.image ? formData.image : "/images/user.png"}
    alt="Profile"
    className="w-24 h-24 rounded-full shadow-md mr-4 object-cover"
  />
  {loader && (
    <div
      className="absolute inset-0 flex items-center justify-center rounded-full pointer-events-none"
      style={{ background: "rgba(255,255,255,0.15)" }}
    >
      <BeatLoader color="#9F9F9F" size={15} speedMultiplier={0.8} />
    </div>
  )}
</div>
  <div>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="hidden"
      id="profileImageInput"
      disabled={loader}
    />
    <label
      htmlFor="profileImageInput"
      className={`bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 ${loader ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      Cambiar Imagen
    </label>
  </div>
</div>

            {/* Personal Information Section */}
            <div className="flex gap-4 mb-4">
              <span
                className={`px-4 py-2 rounded-md font-semibold text-white text-sm 
      ${
        formData.state === "active"
          ? "bg-green-500"
          : formData.state === "pending"
          ? "bg-yellow-500"
          : "bg-red-500"
      }`}
              >
                Estado cuenta: {formData.state || "-"}
              </span>
              <span
                className={`px-4 py-2 rounded-md font-semibold text-white text-sm 
      ${
        formData?.payment === "active"
          ? "bg-green-500"
          : formData?.payment === "pending"
          ? "bg-yellow-500"
          : "bg-red-500"
      }`}
              >
                Estado pagos: {formData?.payment || "-"}
              </span>
            </div>

            <div className="mb-6">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-xl font-semibold">Información Personal</h3>
    <button
      className={`px-4 py-2 rounded-md text-white font-semibold ${isEditing ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
      onClick={() => setIsEditing(!isEditing)}
      type="button"
    >
      {isEditing ? 'Cancelar' : 'Editar Perfil'}
    </button>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {isEditing ? (
      <>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nombre" className="border border-gray-300 rounded-md p-2 w-full" />
        <input type="text" name="surname" value={formData.surname} onChange={handleInputChange} placeholder="Apellidos" className="border border-gray-300 rounded-md p-2 w-full" />
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Dirección" className="border border-gray-300 rounded-md p-2 w-full" />
        <input type="text" name="province" value={formData.province} onChange={handleInputChange} placeholder="Provincia" className="border border-gray-300 rounded-md p-2 w-full" />
        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="Código Postal" className="border border-gray-300 rounded-md p-2 w-full" />
        <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Población" className="border border-gray-300 rounded-md p-2 w-full" />
        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Teléfono" className="border border-gray-300 rounded-md p-2 w-full" />
      </>
    ) : (
      <>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4"><span className="font-semibold">Nombre:</span><p className="text-gray-700">{formData.name || "-"}</p></div>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4"><span className="font-semibold">Apellidos:</span><p className="text-gray-700">{formData.surname || "-"}</p></div>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4"><span className="font-semibold">Dirección:</span><p className="text-gray-700">{formData.address || "-"}</p></div>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4"><span className="font-semibold">Provincia:</span><p className="text-gray-700">{formData.province || "-"}</p></div>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4"><span className="font-semibold">Código Postal:</span><p className="text-gray-700">{formData.postalCode || "-"}</p></div>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4"><span className="font-semibold">Población:</span><p className="text-gray-700">{formData.city || "-"}</p></div>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4"><span className="font-semibold">Teléfono:</span><p className="text-gray-700">{formData.phone || "-"}</p></div>
      </>
    )}
  </div>
  {isEditing && (
    <button
      onClick={() => { handleSubmitProfile(); setIsEditing(false); }}
      className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
    >
      Guardar Cambios
    </button>
  )}
</div>
            {/* Change Password Section */}
            <div>
  <h3 className="text-xl font-semibold mb-4">Cambiar Contraseña</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <input
      type="email"
      name="email"
      value={formData.email}
      disabled
      className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
      placeholder="Correo Electrónico"
    />
    <input
      type="password"
      name="oldPassword"
      value={"********"}
      disabled
      className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
      placeholder="Contraseña Antigua"
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
