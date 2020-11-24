function getTargetEnv() {
    const envVarTargetEnv = process.env.REACT_APP_TARGET_ENV;
    let tEnv = TARGET_ENVS.DEV_LOCAL;
    if (TARGET_ENVS[envVarTargetEnv] !== undefined) {
        tEnv = TARGET_ENVS[envVarTargetEnv];
    }
    return tEnv;
}

const TARGET_ENVS = {
    DEV_LOCAL: 0,
    DEMO_LOCAL_DOCKER: 1,
};

const TARGET_ENV = getTargetEnv();

let HOME_SYSTEM_API_ROOT;
if (TARGET_ENV === TARGET_ENVS.DEV_LOCAL) {
    HOME_SYSTEM_API_ROOT = "http://localhost:8090/";
} else if (TARGET_ENV === TARGET_ENVS.DEMO_LOCAL_DOCKER) {
    HOME_SYSTEM_API_ROOT = "http://localhost/api/";
}

export {
    TARGET_ENV,
    TARGET_ENVS,
    HOME_SYSTEM_API_ROOT
};
