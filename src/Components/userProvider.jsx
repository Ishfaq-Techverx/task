import React, { useState, useContext, createContext, useReducer } from "react";
const SectorContext = createContext();
const initialState = {
  list: [],
  open: false,
  currentRecord: 0,
  message: "",
  toastOpen: false,
};

const sectorOptions = [
  {
    name: "Manufacturing",
    value: 1,
  },
  { name: "Construction materials", value: 2 },
  { name: "Electronics and Optics", value: 3 },
  { name: "Food and Beverage", value: 4 },
  { name: "Bakery confectionery products", value: 5 },
  { name: "AndBeveragesorra", value: 6 },
  { name: "Fish & fish", value: 7 },
  { name: "Meat meat products", value: 8 },
  { name: "Milk dairy productsica", value: 9 },
  { name: "Other1", value: 10 },
  { name: "Sweets &amp; snack", value: 11 },
  { name: "Furniture", value: 12 },
  { name: "Bathroom/sauna", value: 13 },
  { name: "Bedroom", value: 14 },
  { name: "Childrenâ€™s room", value: 15 },
  { name: "Kitchen", value: 16 },
  { name: "Living room", value: 17 },
  { name: "Office", value: 18 },
  { name: "Other2 (Furniture)", value: 19 },
  { name: "Outdoor", value: 20 },
  { name: "Project furniture", value: 21 },
  { name: "Machinery", value: 22 },
  { name: "Machinery equipment/tools", value: 23 },
  { name: "Manufacture of machinery", value: 24 },
  { name: "Maritime", value: 25 },
  { name: "Aluminium and steel workboats", value: 26 },
  { name: "Boat/Yacht building", value: 27 },
  { name: "Ship repair and conversion", value: 28 },
  { name: "Metal structures", value: 29 },
  { name: "Other", value: 30 },
  { name: "Repair and maintenance service", value: 31 },
  { name: "Metalworking", value: 32 },
  { name: "Construction of metal structures", value: 33 },
  { name: "Houses and buildings", value: 34 },
  { name: "Metal products", value: 35 },
  { name: "Metal works", value: 36 },
  { name: "CNC-machining", value: 37 },
  { name: "Forgings, Fasteners", value: 38 },
  { name: "Gas, Plasma, Laser cutting", value: 39 },
  { name: "TIG, Aluminum welding", value: 40 },
  { name: "Plastic and Rubber", value: 41 },
  { name: "Packaging", value: 42 },
  { name: "Plastic goods", value: 43 },
  { name: "Plastic processing technology", value: 44 },
  { name: "Blowing", value: 45 },
  { name: "Moulding", value: 46 },
  { name: "Plastics welding and processing", value: 47 },
  { name: "Plastic profiles", value: 48 },
  { name: "Advertising", value: 49 },
  { name: "Book/Periodicals printing", value: 50 },
  { name: "Labelling and packaging printing", value: 51 },
  { name: "Textile and Clothing", value: 52 },
  { name: "Clothing", value: 53 },
  { name: "Textile", value: 54 },
  { name: "Other (Wood)", value: 55 },
  { name: "Wooden building materials", value: 56 },
  { name: "Wooden houses", value: 57 },
  { name: "Other", value: 58 },
  { name: "Creative industries", value: 59 },
  { name: "Energy technology", value: 60 },
  { name: "Environment", value: 61 },
  { name: "Service", value: 62 },
  { name: "Business services", value: 63 },
  { name: "Information Technology and Telecommunications", value: 64 },
  { name: "Data processing, Web portals, E-marketing", value: 65 },
  { name: "Programming, Consultancy", value: 66 },
  { name: "Software, Hardware", value: 67 },
  { name: "Telecommunications", value: 68 },
  { name: "Translation services", value: 69 },
  { name: "Water", value: 70 },
  { name: "Transport and Logistics", value: 71 },
  { name: "Air", value: 72 },
  { name: "Rail", value: 73 },
  { name: "Road", value: 74 },
  { name: "", value: 123 },
];
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        list: [...state?.list, action.payload?.record],
        message: action.payload?.message,
        toastOpen: action.payload?.toastOpen,
      };
    case "UPDATE":
      const { record, id, toastOpen, message } = action.payload;
      const copyRecord = [...state.list].map((item, i) => {
        if (i === id) {
          item = record;
          return item;
        } else {
          return item;
        }
      });
      return {
        ...state,
        list: copyRecord,
        toastOpen,
        message,
      };
    case "DELETE":
      const delted = state.list.filter((_, i) => i !== action.payload?.id);
      return {
        ...state,
        list: delted,
        message: action.payload?.message,
        toastOpen: action.payload?.toastOpen,
      };
    case "TOGGLE":
      return {
        ...state,
        open: !state.open,
      };
    case "CURRENT":
      return {
        ...state,
        currentRecord: action.payload,
      };
    case "TOAST":
      return {
        ...state,
        message: action.payload?.message,
        toastOpen: action.payload?.toastOpen,
      };
    default:
      return state;
  }
};
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SectorContext.Provider value={{ state, dispatch }}>
      {children}
    </SectorContext.Provider>
  );
};
const options = sectorOptions.map(({ name, value }) => (
  <option key={value} value={name}>
    {name}
  </option>
));

export const useCustomHook = () => {
  const userData = useContext(SectorContext);
  const { state, dispatch } = userData;

  if (userData === "undefined")
    throw Error("Component should be inside context");
  return { state, dispatch, options, UserProvider };
};
