import Spacer from '@/ui/spacer/spacer';
import Text from '@/ui/text/text';
import RadioButton from '@/ui/radioButton/radioButton';
import SelectModal from '@/ui/selectModal/selectModal';
import Button from '@/ui/button/button';
import data from '../../data/rates.json';
import { FormSteps } from '@/app/form/page';
import { useStepStore } from '@/store/zustand';

const FirstStep = ({
  dataCheck,
}: {
  dataCheck: (nextStep: FormSteps) => void;
}) => {
  const { isPricedRadioOption, setIsPricedRadioOption, province, setProvince } =
    useStepStore();

  const isPricedRadioOptions = [
    { id: 1001, label: 'Si' },
    { id: 1002, label: 'No' },
  ];

  const getIsPricedRadioOption = (value: string) => {
    setIsPricedRadioOption(value);
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
      <Text preset='small' text='¿La vivienda está tasada?' color='subtle' />
      <Spacer size='huge' />
      <RadioButton
        name='is-priced'
        options={isPricedRadioOptions}
        selectedOption={isPricedRadioOption}
        setOption={getIsPricedRadioOption}
      />
      <Spacer size='giant' />
      <SelectModal
        options={provinces}
        setOption={getProvince}
        selectName='¿Donde esta la casa?'
        initialButtonText={province ? province : 'Seleccionar'}
        modalHeader='Selecciona una comunidad'
      />
      <Spacer size='huge' />
      <Spacer size='huge' />
      <Spacer size='huge' />
      <div className='form-button'>
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
