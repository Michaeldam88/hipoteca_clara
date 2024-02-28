import { create } from "zustand";

type StepsStore = {
  isPricedRadioOption: string;
  setIsPricedRadioOption: (data: string) => void;
  isNewRadioOption: string;
  setIsNewRadioOption: (data: string) => void;
  province: string;
  setProvince: (data: string) => void;
  housePrice: string;
  setHousePrice: (data: string) => void;
  appraisalPrice: string;
  setAppraisalPrice: (data: string) => void;
  amountFinanced: number;
  setAmountFinanced: (data: number) => void;
  yearsMortgage: number;
  setYearsMortgage: (data: number) => void;
  mortgageOption: string;
  setMortgageOption: (data: string) => void;
  fixedTin: string;
  setFixedTin: (data: string) => void;
  fixedTae: string;
  setFixedTae: (data: string) => void;
  variableTin: string;
  setVariableTin: (data: string) => void;
  variableTae: string;
  setVariableTae: (data: string) => void;
  yearsFixedMortgage: number;
  setYearsFixedMortgage: (data: number) => void;
  mortgageResults: {
    monthlyTinPayment: number;
    monthlyTaePayment: number;
    totalPaidTin: number;
    totalPaidTae: number;
    totalPeriods: number;
  };
  setMortgageResults: (data: {
    monthlyTinPayment: number;
    monthlyTaePayment: number;
    totalPaidTin: number;
    totalPaidTae: number;
    totalPeriods: number;
  }) => void;
  totalExpenses: number;
  setTotalExpenses: (data: number) => void;
  reset: () => void;
};

export const useStepStore = create<StepsStore>((set) => {
  const initialState: Omit<StepsStore, "reset"> = {
    isPricedRadioOption: "",
    setIsPricedRadioOption: (value) => set({ isPricedRadioOption: value }),
    isNewRadioOption: "",
    setIsNewRadioOption: (value) => set({ isNewRadioOption: value }),
    province: "",
    setProvince: (value) => set({ province: value }),
    housePrice: "",
    setHousePrice: (value) => set({ housePrice: value }),
    appraisalPrice: "",
    setAppraisalPrice: (value) => set({ appraisalPrice: value }),
    amountFinanced: 0,
    setAmountFinanced: (value) => set({ amountFinanced: value }),
    yearsMortgage: 25,
    setYearsMortgage: (value) => set({ yearsMortgage: value }),
    mortgageOption: "",
    setMortgageOption: (value) => set({ mortgageOption: value }),
    fixedTin: "",
    setFixedTin: (value) => set({ fixedTin: value }),
    fixedTae: "",
    setFixedTae: (value) => set({ fixedTae: value }),
    variableTin: "",
    setVariableTin: (value) => set({ variableTin: value }),
    variableTae: "",
    setVariableTae: (value) => set({ variableTae: value }),
    yearsFixedMortgage: 1,
    setYearsFixedMortgage: (value) => set({ yearsFixedMortgage: value }),
    mortgageResults: {
      monthlyTinPayment: 0,
      monthlyTaePayment: 0,
      totalPaidTin: 0,
      totalPaidTae: 0,
      totalPeriods: 0,
    },
    setMortgageResults: (value) => set({ mortgageResults: value }),
    totalExpenses: 0,
    setTotalExpenses: (value) => set({ totalExpenses: value }),
  };

  return {
    ...initialState,
    reset: () => set(initialState),
  };
});
