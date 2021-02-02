export interface Pizza {
    id: string,
    name: string,
    price: number,
    ingredients: Array<string>
  }

export interface Order {
  pizza: Array<Pizza>,
  total: number
}
