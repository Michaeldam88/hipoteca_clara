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
    setIsPricedRadioOption: (value) => {
      set({ isPricedRadioOption: value });
      saveToSessionStorage("isPricedRadioOption", value);
    },
    isNewRadioOption: "",
    setIsNewRadioOption: (value) => {
      set({ isNewRadioOption: value });
      saveToSessionStorage("isNewRadioOption", value);
    },
    province: "",
    setProvince: (value) => {
      set({ province: value });
      saveToSessionStorage("province", value);
    },
    housePrice: "",
    setHousePrice: (value) => {
      set({ housePrice: value });
      saveToSessionStorage("housePrice", value);
    },
    appraisalPrice: "",
    setAppraisalPrice: (value) => {
      set({ appraisalPrice: value });
      saveToSessionStorage("appraisalPrice", value);
    },
    amountFinanced: 0,
    setAmountFinanced: (value) => {
      set({ amountFinanced: value });
      saveToSessionStorage("amountFinanced", value);
    },
    yearsMortgage: 25,
    setYearsMortgage: (value) => {
      set({ yearsMortgage: value });
      saveToSessionStorage("yearsMortgage", value);
    },
    mortgageOption: "",
    setMortgageOption: (value) => {
      set({ mortgageOption: value });
      saveToSessionStorage("mortgageOption", value);
    },
    fixedTin: "",
    setFixedTin: (value) => {
      set({ fixedTin: value });
      saveToSessionStorage("fixedTin", value);
    },
    fixedTae: "",
    setFixedTae: (value) => {
      set({ fixedTae: value });
      saveToSessionStorage("fixedTae", value);
    },
    variableTin: "",
    setVariableTin: (value) => {
      set({ variableTin: value });
      saveToSessionStorage("variableTin", value);
    },
    variableTae: "",
    setVariableTae: (value) => {
      set({ variableTae: value });
      saveToSessionStorage("variableTae", value);
    },
    yearsFixedMortgage: 1,
    setYearsFixedMortgage: (value) => {
      set({ yearsFixedMortgage: value });
      saveToSessionStorage("yearsFixedMortgage", value);
    },
    mortgageResults: {
      monthlyTinPayment: 0,
      monthlyTaePayment: 0,
      totalPaidTin: 0,
      totalPaidTae: 0,
      totalPeriods: 0,
    },
    setMortgageResults: (value) => {
      set({ mortgageResults: value });
    },
    totalExpenses: 0,
    setTotalExpenses: (value) => {
      set({ totalExpenses: value });
      saveToSessionStorage("totalExpenses", value);
    },
  };

  return {
    ...initialState,
    reset: () => {
      set(initialState);
      sessionStorage.clear();
    },
  };
});

const saveToSessionStorage = (key: string, value: any) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to session storage:", error);
  }
};

export const initializeFromSessionStorage = () => {
  const savedData: Partial<StepsStore> = {};

  try {
    const keys: string[] = Object.keys(sessionStorage);
    keys.forEach((key) => {
      const storedValue = sessionStorage.getItem(key);
      if (storedValue) {
        savedData[key] = JSON.parse(storedValue);
      }
    });
  } catch (error) {
    console.error("Error loading from session storage:", error);
  }

  return savedData;
};
