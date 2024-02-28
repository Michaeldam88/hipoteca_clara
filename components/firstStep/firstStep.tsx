import Spacer from '@/ui/spacer/spacer';
import Text from '@/ui/text/text';
import RadioButton from '@/ui/radioButton/radioButton';
import SelectModal from '@/ui/selectModal/selectModal';
import Button from '@/ui/button/button';
import data from '../../data/rates.json';

import { useStepStore } from '@/store/zustand';
import { FormSteps } from '@/app/types';

const FirstStep = ({
  dataCheck,
}: {
  dataCheck: (nextStep: FormSteps) => void;
}) => {
  const {
    isPricedRadioOption,
    isNewRadioOption,
    setIsNewRadioOption,
    setIsPricedRadioOption,
    province,
    setProvince,
  } = useStepStore();

  const isPricedRadioOptions = [
    { id: 1001, label: 'Si' },
    { id: 1002, label: 'No' },
  ];

  const isNewRadioOptions = [
    { id: 1003, label: 'Si' },
    { id: 1004, label: 'No' },
  ];

  const getIsPricedRadioOption = (value: string) => {
    setIsPricedRadioOption(value);
  };

  const getIsNewRadioOption = (value: string) => {
    setIsNewRadioOption(value);
  };

  const provinces =
    data['autonomous-region']?.map((element) => {
      return {
        id: element.id,
        value: element.name,
      };
    }) || [];

  const getProvince = (value: string) => {
    setProvince(value);
  };

  return (
    <div>
      <Text preset='small' text='¿La vivienda es nueva?' color='subtle' />
      <Spacer size='medium' />
      <RadioButton
        name='is-new'
        options={isNewRadioOptions}
        selectedOption={isNewRadioOption}
        setOption={getIsNewRadioOption}
      />
      <Spacer size='medium' />
      <Text preset='small' text='¿La vivienda está tasada?' color='subtle' />
      <Spacer size='medium' />
      <RadioButton
        name='is-priced'
        options={isPricedRadioOptions}
        selectedOption={isPricedRadioOption}
        setOption={getIsPricedRadioOption}
      />
      <Spacer size='medium' />

      <SelectModal
        options={provinces}
        setOption={getProvince}
        selectName='¿Donde esta la casa?'
        initialButtonText={province ? province : 'Seleccionar'}
        modalHeader='Selecciona una comunidad'
      />
      <Spacer size='enormous' />
      <Spacer size='medium' />

      <div className='button-on-bottom'>
        <Button
          text='Continuar'
          preset='primary'
          size='medium'
          onClick={() => dataCheck(FormSteps.PRICE)}
        />
      </div>
    </div>
  );
};

export default FirstStep;
