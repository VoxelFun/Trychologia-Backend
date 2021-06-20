
export function getLogInRoute() {
    return "login"
}

export interface LogInRequest {
    email: string;
    password: string;
}

export interface LogInResponse {
    ok: boolean;
}