import axios from "axios";
import URL from "./server_url";

// 이번 리펙토링에 처음 적용해봐서 통신 테스트가 필요합니다

// Axios 기본 설정
const instance = axios.create({
    baseURL: URL, // server_url에서 불러온 URL 사용
});

// 요청 인터셉터 설정
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            // config.headers.Content-Type = 'application/json';
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
    (response) => {
        // 응답 데이터를 그대로 반환
        return response;
    },
    (error) => {
        // 오류 처리 로직(코드로 할지 status로 관리할지 얘기해봐야할것 같습니다.
        // 세세한 오류처리를 위해 status가 맞는것 같고 추가적으로 이건 그냥 정말 기본적인 토큰 삭제 후 메인페이지 이동만 있으므로 추가적인 오류처리가 들어가야할것같습니다.
        // 토큰 만료시 다시 받아서 그대로 다시 진행한다거나 등등등)
        if (error.response && (error.response.data.code === "SEC-001" || error.response.data.code === "SEC-002")) {
            localStorage.removeItem("token");
            window.location.href = "/"; // navigate를 사용하지 않고 직접 이동(현재 상태나 캐시를 모두 초기화 할수 있음) 즉 클린 상태로 재시작 시킴
        }
        return Promise.reject(error);
    }
);

export default axios;
