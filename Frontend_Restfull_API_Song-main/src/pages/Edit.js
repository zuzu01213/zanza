import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import InfoCard from "./SideBar";
import Navbar from "./Navbar";

function EditData() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [songs, setSongs] = useState({});
  const [editDataLagu, setEditDataLagu] = useState({
    nama: "",
    judul_lagu: "",
    image: null
  }); // Set initial state for editDataLagu

  let {id} = useParams();

  useEffect(() => {
    fetchSongs(id);
    fetchData();
    fetchEditData(id); // Fetch data for edit
  }, [id]);

  const handleChangeTambahLagu = (e) => {
    const { name, value, files } = e.target;
    setEditDataLagu({
      ...editDataLagu,
      [name]: name === 'image' ? files[0] : value
    });
  };

  const [validation, setValidation] = useState([]);

  const fetchSongs = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/songs/${id}`);
      setSongs(response.data.data);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data lagu:', error);
    }
  };

  const fetchEditData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/songs/${id}`);
      setEditDataLagu({
        nama: response.data.data.nama,
        judul_lagu: response.data.data.judul_lagu,
        image: response.data.data.image // Sesuaikan dengan kunci gambar di data Anda
      });
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data lagu:', error);
    }
  };

  const fetchData = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.post(
        "http://localhost:8000/api/auth/user-profile"
      );
      setUser(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Terjadi kesalahan:", error);
      }
    }
  };

  const SubmitEditLagu = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("image", editDataLagu.image);
    formData.append("nama", editDataLagu.nama);
    formData.append("judul_lagu", editDataLagu.judul_lagu);

    try {
      await axios.post(`http://localhost:8000/api/songs/${id}?_method=PATCH`, formData, {
      headers: {
        'X-HTTP-Method-Override': 'PATCH'
      }
    });
      Swal.fire({
        icon: 'success',
        title: 'Data lagu berhasil diubah',
      });
      setEditDataLagu({
        nama: "",
        judul_lagu: "",
        image: null
      });
      fetchSongs(id);
      fetchData();
      navigate('/home');
    } catch (error) {
      setValidation(error.response.data);
      console.error('Terjadi kesalahan saat mengubah data lagu:', error);
    }
  };
  
  const logoutHandler = async () => {
    Swal.fire({
      title: "Apakah Anda yakin ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios
          .post("http://localhost:8000/api/auth/logout")
          .then(() => {
            localStorage.removeItem("token");
            navigate("/login");
          })
          .catch((error) => {
            console.error("Terjadi kesalahan:", error);
          });
      }
    });
  };

  const handleReset = () => {
    setEditDataLagu({
      nama: "",
      judul_lagu: "",
      image: null
    });
  }
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Content */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
          <div>
            <InfoCard user={user} logoutHandler={logoutHandler} />
            {/* ... konten lain dari halaman Home */}
          </div>
          </div>
          <div className="col-md-8">
            <div className="card border-0 shadow rounded">
              <div className="card-header">
                <strong>Edit Data lagu</strong>
              </div>
              <div className="card-body">
                <form onSubmit={SubmitEditLagu} id="formEdit" className="mt-4">
                    <div className="mb-3">
                        <label htmlFor="nama">Nama</label>
                        <input
                        type="text"
                        className="form-control"
                        id="nama"
                        name="nama"
                        autoComplete="off"
                        value={editDataLagu.nama}
                        onChange={handleChangeTambahLagu}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="judulLagu">Judul Lagu</label>
                        <input
                        type="text"
                        className="form-control"
                        id="judulLagu"
                        name="judul_lagu"
                        autoComplete="off"
                        value={editDataLagu.judul_lagu}
                        onChange={handleChangeTambahLagu}
                        />                            
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image">Gambar</label>
                        <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleChangeTambahLagu}
                        />                           
                    </div>
                    <div className="mb-3">
                      {editDataLagu.image && (
                        <img
                          src={typeof editDataLagu.image === 'string' ? editDataLagu.image : URL.createObjectURL(editDataLagu.image)}
                          alt="Image Preview"
                          style={{ maxWidth: '180px' }} 
                        />
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary"><i className="bi bi-floppy"></i> Simpan</button>
                    <Link to="/home" className="btn btn-danger ms-2"><i className="bi bi-arrow-left-square"></i> Back</Link>
                    {/* <a href="/home" className="btn btn-danger ms-2"><i className="bi bi-arrow-left-square"></i> Back</a> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditData;
