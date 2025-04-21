import  { useEffect, useState } from 'react'
import '../list/List.css'
import { url, currency } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const ListMed = () => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/medicine/listmed`)
    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/medicine/removemed`, {
      id: foodId
    })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
      
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images1/` + item.image} alt="" />
              <p>{item.name}</p>
              
              <p>{currency}{item.price}</p>
              <p className='cursor' onClick={() => removeFood(item._id)}>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListMed
