import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setVariantOptions } from '../features/variants/variantsSlice';

const VariantOptionsForm = ({ vGroup }) => {
  const dispatch = useDispatch();

  const [variantOptionName, setVariantOptionName] = useState('');

  const handleVariantOptionsSubmit = (e, vOptParent) => {
    e.preventDefault();

    const variantOptionData = {
      parentName: vOptParent,
      name: variantOptionName,
    };

    dispatch(setVariantOptions(variantOptionData));

    setVariantOptionName('');
  };

  const handleVariantOptionsInput = (e, vGroupName) => {
    // const name = `variant-option-${vGroupName}`;

    setVariantOptionName(e.target.value);
  };

  return (
    <form onSubmit={(e) => handleVariantOptionsSubmit(e, vGroup.name)}>
      <label htmlFor={`variant-option-${vGroup.name}`}>
        {vGroup.name} Options
      </label>
      <input
        type='text'
        id={`variant-option-${vGroup.name}`}
        value={variantOptionName}
        onChange={(e) => handleVariantOptionsInput(e, vGroup.name)}
      />
      <button type='submit'>Add Option</button>
      <h1>{vGroup.name}</h1>
    </form>
  );
};

export default VariantOptionsForm;
