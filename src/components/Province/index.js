import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

function Province(props) {
  

    const [provinces,setProvince]=useState()
    const [districts,setDistrict]=useState()
    const [wards,setWard]=useState()

  

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_VIETNAM_URI}`)
    .then(res=>{
      let temps= res.data.results?.map(p=>{
        return {
          value:p.province_name,
          label:p.province_name,
          id:p.province_id
        }
      })
      setProvince(temps)
    })
    .catch(err=>{
      console.log(err)
    })
  },[])

  const handleProvinceChange = (selectedOption) => {
    props.changeProvince(selectedOption);
    axios.get(`${process.env.REACT_APP_VIETNAM_URI}district/${selectedOption.id}`)
    .then(res=>{
        setDistrict(res.data.results?.map(d=>{
          return {
            value:d.district_name,
            label:d.district_name,
            id:d.district_id
          }
        }))
    })
    .catch(err=>{
      console.log(err)
    })
    props.changeDistrict(null);
    props.changetedWard(null);
  };

  const handleDistrictChange = (selectedOption) => {
    props.changeDistrict(selectedOption);
    axios.get(`${process.env.REACT_APP_VIETNAM_URI}ward/${selectedOption.id}`)
    .then(res=>{
        setWard(res.data.results?.map(w=>{
          return {
            value:w.ward_name,
            label:w.ward_name,
            id:w.ward_id
          }
        }))
    })
    .catch(err=>{
      console.log(err)
    })
    props.changeWard(null);
  };

  const handleWardChange = (selectedOption) => {
    props.changeWard(selectedOption);
  };

  return (
    <div>
      <Select
        value={props.selectedProvince}
        onChange={handleProvinceChange}
        options={provinces}
        placeholder="Chọn tỉnh thành phố"
      />
      <Select
        value={props.selectedDistrict}
        onChange={handleDistrictChange}
        options={districts}
        placeholder="Chọn quận huyện"
        isDisabled={!props.selectedProvince}
      />
      <Select
        value={props.selectedWard}
        onChange={handleWardChange}
        options={wards}
        placeholder="Chọn xã phường"
        isDisabled={!props.selectedDistrict}
      />
    </div>
  );
}

export default Province;
