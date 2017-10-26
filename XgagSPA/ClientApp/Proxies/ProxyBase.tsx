﻿import { RuntimeInfo } from '../RuntimeInfo'

export abstract class ProxyBase {
    protected getRequestInit(method: string, body: any | null): RequestInit {
        return {
            credentials: 'include',
            method: method,
            body: body ? JSON.stringify(body) : null,
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            }),
        };
    }
}