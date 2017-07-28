export class CounterEntry {
  id: number;
  date: string;
  amount: number;
  confirmed: boolean;

  note: string;
  organisation: number;

  constructor(date: Date, amount: number, organisation: number) {
    this.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    this.amount = amount;
    this.organisation = organisation;
    this.confirmed = false;
    this.note = '';
  }

  public equals(other: CounterEntry) {
    return this.amount === other.amount &&
        this.date === other.date &&
        this.organisation === other.organisation;
  }

}
