import { GET_USER_PROFILE } from "./constants";

export function getUserProfile() {
    return {
        type: GET_USER_PROFILE,
    }
}