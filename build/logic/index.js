"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    access: {
        identification: {
            nin: [
                "identification:different",
            ],
            wildcard: [
                "session:shake",
                "identification:wildcard",
                "session:host",
                "session:validate",
                "identification:same",
            ]
        },
        signature: {
            nin: [
                "signing:same",
                "signing:different",
                "document:sign"
            ],
            wildcard: [
                "signing:wildcard",
            ]
        },
        flow: [
            "flow:ping",
            "flow:cancel",
            "flow:authorize",
        ],
        resource: [
            "identity:read",
            "identity:write",
            "payment:read"
        ]
    },
    whitelisted: {
        apps: [
            "app_c5c51d80-d5b4-1074-8a30-ef5ee71fb66b",
            "app_a3461800-4368-1f9e-a939-7378e8aa4e66",
            "app_2bd45880-c5bd-1f09-b9da-35d7a0480fb0",
            "app_752c3f00-a34b-1d10-a56e-e3c178af2901",
            "app_c2695980-4882-1cfb-98a0-f1996b70cce5",
            "app_2ba91980-4dfb-1cfb-8823-7f4b55c2fa4e",
            "app_76fd9d80-a10a-103a-b7c6-25e88d3b7c95", // jigi app
        ],
        consumers: [
            "bcn_ae2a0c84-4fa9-4736-b61c-949bf70be31a",
            "bcn_577050ed-bfe2-46c5-8e0e-ecd5c3c8ea54",
            "bcn_d4fc5529-3788-44c7-8800-daa18b7b93d4", // Pikaboo Studios
        ]
    }
};
//# sourceMappingURL=index.js.map