import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Books, Categories } from '../client_types';
import { APIService, TOKEN_KEY } from '../services/APIService';

const PrivateWrapper = () => {
    return (
        <div> Private Wrapper

        </div>
    )
}

export default PrivateWrapper
