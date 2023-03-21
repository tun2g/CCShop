import React, { useState } from 'react';
import Select from 'react-select';

function ShippingForm() {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const provinces = [
    { value: 'hn', label: 'Hà Nội' },
    { value: 'hcm', label: 'TP.Hồ Chí Minh' },
    // Danh sách các tỉnh thành khác ở đây
  ];

  const districts = [
    { value: 'hbt', label: 'Hai Bà Trưng', province: 'hn' },
    { value: 'hnq', label: 'Hoàn Kiếm', province: 'hn' },
    // Danh sách các quận huyện khác ở đây
  ];

  const wards = [
    { value: 'bt', label: 'Bạch Thái', district: 'hbt' },
    { value: 'bl', label: 'Bách Khoa', district: 'hbt' },
    // Danh sách các xã phường khác ở đây
  ];

  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    setSelectedWard(null);
  };

  const handleWardChange = (selectedOption) => {
    setSelectedWard(selectedOption);
  };

  return (
    <div>
      <Select
        value={selectedProvince}
        onChange={handleProvinceChange}
        options={provinces}
        placeholder="Chọn tỉnh thành phố"
      />
      <Select
        value={selectedDistrict}
        onChange={handleDistrictChange}
        options={districts.filter((district) => district.province === selectedProvince?.value)}
        placeholder="Chọn quận huyện"
        isDisabled={!selectedProvince}
      />
      <Select
        value={selectedWard}
        onChange={handleWardChange}
        options={wards.filter((ward) => ward.district === selectedDistrict?.value)}
        placeholder="Chọn xã phường"
        isDisabled={!selectedDistrict}
      />
    </div>
  );
}

export default ShippingForm;
