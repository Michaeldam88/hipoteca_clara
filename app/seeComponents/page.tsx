"use client"

import './seeComponents.scss';

import Spacer from '@/ui/spacer/spacer';
import { useEffect, useState } from 'react';
import Text from '@/ui/text/text';
import Button from '@/ui/button/button';
import RadioButton from '@/ui/radioButton/radioButton';
import Select from '@/ui/select/select';
import Modal from '@/ui/modal/modal';
import SelectModal from '@/ui/selectModal/selectModal';
import List from '@/ui/list/list';
import Input from '@/ui/customInput/input';
import Stepper from '@/ui/stepper/stepper';
import Pagination from '@/ui/pagination/pagination';
import RangeInput from '@/ui/rangeInput/rangeInput';
import PopUp from '@/ui/popUp/popUp';

export default function SeeComponents() {
  const radioOptions = [
    { id: 1001, label: 'Yes', subLabel: 'All the little details' },
    { id: 1002, label: 'No', subLabel: 'All the little details' },
    { id: 1003, label: 'Unknown' },
  ];

  const countryOptions = [
    { id: 2001, value: 'Spain' },
    { id: 2002, value: 'Italy' },
    { id: 2003, value: 'Portugal' },
    { id: 2004, value: 'Germany' },
  ];

  const [radioOption, setRadioOption] = useState('');
  const [countryOption, setCountryOption] = useState('');
  const [countryOptionModal, setCountryOptionModal] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [page, setPage] = useState(1);

  const [modal, setModal] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [startClosingModal, setStartClosingModal] = useState(false);

  const getRadioOption = (value: string) => {
    setRadioOption(value);
  };

  const getCountryOption = (value: string) => {
    setCountryOption(value);
  };

  const getCountryOptionModal = (value: string) => {
    setCountryOptionModal(value);
  };

  const inputRight = '€';

  const getInputValue = (value: string) => {
    setInputValue(value);
  };

  const handleNextPage = () => {
    setPage(page + 1);
    setActiveStep(activeStep + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
    setActiveStep(activeStep - 1);
  };

  const steps = [
    {
      id: 0,
      title: 'Presupuesto',
    },
    {
      id: 1,
      title: 'Datos',
    },
    {
      id: 2,
      title: 'Resumen',
      subTitle: 'escribe  tu presupuesto',
    },
    {
      id: 3,
      title: 'Confirmación',
      subTitle: 'Confirma los detalles',
    },
  ];

  const min = 0;
  const max = 100000;
  const [rangeValue, setRangeValue] = useState(30000);
  const percentage = Math.round((rangeValue / max) * 100);
  const handleRangeValue = (value: number) => {
    setRangeValue(value);
  };

  useEffect(() => {
    console.log(radioOption, countryOption, countryOptionModal, inputValue);
  }, [radioOption, countryOption, countryOptionModal, inputValue]);

  return (
    <section className='see-components-container'>
      <h1>Components</h1>
      <Spacer />
      <p>Header H1</p>
      <Spacer />
      <Text
        preset='headline1'
        text={'Calculadora de hipotecas'}
        weight='bold'
      />
      <Spacer size='large' />
      <p>Header H2</p>
      <Spacer />
      <Text preset='headline2' text={'Calculadora de hipotecas'} />
      <Spacer size='large' />
      <p>Header H3</p>
      <Spacer />
      <Text preset='headline3' text={'Calculadora de hipotecas'} />
      <Spacer size='large' />
      <p>Header H4</p>
      <Spacer />
      <Text preset='headline4' text={'Calculadora de hipotecas'} />
      <Spacer size='large' />
      <p>Header H5</p>
      <Spacer />
      <Text preset='headline5' text={'Calculadora de hipotecas'} />
      <Spacer size='large' />
      <p>Paragraph</p>
      <Spacer />
      <Text
        preset='small'
        text={
          'total, incluyendo hipoteca y gastos asociados. Toma decisiones informadas y confía en tu futuro.'
        }
      />
      <Spacer size='large' />
      <p>Paragraph Subtle</p>
      <Spacer />
      <Text
        preset='small'
        text={
          'total, incluyendo hipoteca y gastos asociados. Toma decisiones informadas y confía en tu futuro.'
        }
        color='subtle'
      />
      <Spacer size='large' />
      <p>Button</p>
      <Spacer />
      <Button
        text='Button Title'
        preset='primary'
        type='button'
        size='medium'
      />
      <Spacer size='large' />
      <p>Button Disabled</p>
      <Spacer />
      <Button
        text='Button Title'
        preset='primary'
        type='button'
        size='medium'
        disabled
      />
      <Spacer size='large' />
      <p>List</p>
      <List elements={countryOptions} />
      <Spacer />
      <Spacer size='large' />
      <p>Radio Button</p>
      <Spacer />
      <RadioButton
        options={radioOptions}
        name='Confirm Radio'
        setOption={getRadioOption}
      />
      <Spacer size='large' />
      <p>Select</p>
      <Spacer />
      <Select
        name='country-select'
        options={countryOptions}
        setOption={getCountryOption}
      />
      <Spacer size='large' />
      <p>Modal Select</p>
      <Spacer />
      <SelectModal
        options={countryOptions}
        setOption={getCountryOptionModal}
        selectName='Choose a Country:'
        initialButtonText='-- Choose a country --'
        modalHeader='Texto custom'
      />
      <Spacer size='large' />
      <p>Modal</p>
      <Spacer />
      <Button
        text='Open Modal'
        preset='primary'
        type='button'
        size='medium'
        onClick={() => setModal(true)}
      />
      {modal && (
        <Modal
          onClose={() => {
            setStartClosingModal(false);
            setModal(false);
          }}
          header={
            <Text
              text='Seleccionar Provincia'
              preset='headline4'
              weight='bold'
            />
          }
          content={<Text text='Hola' preset='small' />}
          footer={
            <Button
              preset='primary'
              text={'Close Modal'}
              onClick={() => setStartClosingModal(true)}
              size='medium'
            />
          }
          startClosing={startClosingModal}
        />
      )}
      <Spacer size='large' />
      <p>Text Input Placeholder</p>
      <Spacer />
      <Input
        setValue={getInputValue}
        placeholder='Nombre Presupuesto'
        type='text'
      />
      <Spacer size='large' />
      <p>Text Input Label</p>
      <Spacer />
      <Input
        setValue={getInputValue}
        label='Precio vivienda'
        right={inputRight}
        type='number'
      />
      <Spacer size='large' />
      <p>Stepper</p>
      <Spacer />
      <Stepper<number> activeStep={activeStep} steps={steps} />
      <Spacer size='large' />
      <p>Pagination</p>
      <Spacer />
      {
        <Pagination
          page={page}
          totalPages={steps?.length}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      }
      <Spacer size='large' />
      <p>Range Input</p>
      <Spacer />
      <RangeInput
        value={rangeValue}
        setValue={handleRangeValue}
        name='total-amount-range'
        labelText='Select total amount'
        topFormattedValue={new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
        }).format(rangeValue)}
        middleFormattedValue='Text'
        bottomFormattedValue={`${percentage} %`}
        limitColor={true}
        min={min}
        max={max}
        step={1000}
      />
      <Spacer size='large' />
      <p>Pop UP</p>
      <Spacer />
      <Button
        text='Open PopUp'
        preset='primary'
        type='button'
        size='medium'
        onClick={() => setPopUp(true)}
      />
      {popUp && (
        <PopUp
          text='Un texto de prueba que es lo que podriamos tener'
          handleClose={() => setPopUp(false)}
        />
      )}
      <Spacer size='huge' />
      <Spacer size='huge' />
    </section>
  );
}
