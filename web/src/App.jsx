import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts ] = useState([]);
  const [selected, setSelected ] = useState({})

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [id, setId] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleImageChange = (event) => {
    setImage(event.target.value);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(e.target);
    const name = e.target.name.value;
    const price = e.target.price.value;
    const description = e.target.description.value;
    const image = e.target.image.value;

    console.log(name, price, description, image);

    const res = await fetch('http://localhost:3000/api/products',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        price,
        description,
        image
      })
    });

    getUsers();
  }

  const handleDelete = async (id)=>{
    const res = await fetch(`http://localhost:3000/api/products/${id}`,{
      method: "DELETE"
    });
    getUsers();
  }

  const getUsers = async () => {
    const res = await fetch('http://localhost:3000/api/products');
    const data = await res.json();

    console.log(data);
    setProducts(data);
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log(name,price, description, image);

    const res = await fetch(`http://localhost:3000/api/products/${id}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        price,
        description,
        image
      })
    });



    getUsers();
    
  }


  useEffect(()=>{
    getUsers();
  },[]);

  return (
    <>
    <div className="w-screen h-screen flex items-center justify-center gap-8">

      <div className='w-[30%] border-2 border-green-600 rounded-md'>
        <h1 className="font-bold text-center">AGREGAR UN NUEVO PRODUCTO</h1>
        <form onSubmit={handleSubmit} className="flex flex-col p-4 gap-4">
          <input name="name" className="border-2 border-blue-500 p-2 rounded-md" type="text" placeholder="name" />
          <input name="price" className="border-2 border-blue-500 p-2 rounded-md" type="number" placeholder="price" />
          <input name="description" className="border-2 border-blue-500 p-2 rounded-md" type="text" placeholder="description" />
          <input name="image" className="border-2 border-blue-500 p-2 rounded-md" type="text" placeholder="image" />

          <button className="border-2 p-2 bg-green-500 rounded-md">Crear producto</button>
        </form>
      </div>
      <div className='w-[30%] border-2 border-green-600 rounded-md'>
        <h1 className="font-bold text-center">EDITAR UN PRODUCTO</h1>
        <form onSubmit={handleEdit} className="flex flex-col p-4 gap-4">
          <input  value={name} onChange={handleNameChange} name="name" className="border-2 border-blue-500 p-2 rounded-md" type="text" placeholder="name" />
          <input value={price} onChange={handlePriceChange}  name="price" className="border-2 border-blue-500 p-2 rounded-md" type="number" placeholder="price" />
          <input value={description} onChange={handleDescriptionChange} name="description" className="border-2 border-blue-500 p-2 rounded-md" type="text" placeholder="description" />
          <input value={image} onChange={handleImageChange} name="image" className="border-2 border-blue-500 p-2 rounded-md" type="text" placeholder="image" />

          <button type='submit' className="border-2 p-2 bg-green-500 rounded-md">Editar</button>
        </form>
      </div>
      
      <div className="p-8 border-2 border-green-400 rounded-md mt-4 w-[70%] h-[80%]">
        <h1 className="font-bold text-center">Listado productos</h1>
        <div className="grid grid-cols-4 p-2 gap-4">
          {products.map((product) => {
            return (
              <div key={product._id} className="border-2 rounded-lg border-blue-400 p-4">
                <h1 className="font-bold">{product.name}</h1>
                <h2 className="text-green-500">{product.price}</h2>
                <h2>{product.description}</h2>
                <img src={product.image} alt="" />
                <div className="p-2 flex flex-col">
                <button onClick={() => {
                  console.log(product._id);
                  handleDelete(product._id);
                }} className="border-2 text-white rounded-md p-2 bg-red-500">Eliminar</button>

                <button onClick={() => {
                  setName(product.name);
                  setPrice(product.price);
                  setDescription(product.description);
                  setImage(product.image);
                  setId(product._id);
                }} className="border-2 text-white rounded-md p-2 bg-blue-500">Editar</button>
                </div>


              </div>
            )
          })}
        </div>
      </div>

    </div>
    </>
  )
}

export default App
