/**
 * Dojah BVN Response
 */
export interface DojahBVNResponse {
    bvn: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    gender: string;
    date_of_birth: string;
    phone_number1: string;
    image: string;
    email: string;
    enrollment_branch: string;
    enrollment_bank: string;
    level_of_account: string;
    lga_of_origin: string;
    lga_of_residence: string;
    marital_status: string;
    name_on_card: string;
    nationality: string;
    nin: string;
    registration_date: string;
    residential_address: string;
    state_of_origin: string;
    state_of_residence: string;
    title: string;
    watch_listed: string;
    customer: string;
}
/**
 * NIN response
 */
export interface DojahNINResponse {
    first_name: string;
    last_name: string;
    middle_name: string;
    phone_number: string;
    photo: string;
    date_of_birth: string;
    customer: string;
    gender: string;
}
