
export type Customer = {
    id: number;
    name: string;
    email: string;
    phone: string;
};

export type CustomerKey = keyof Customer;

export const DummyCustomer: Customer = {
    id: -1,
    name: "",
    email: "",
    phone: ""
};