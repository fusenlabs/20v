import React, {Component} from 'react';

let Footer = () => (
    <div className='footer'>
        <p className='left'>
            Developed by <a href='https://github.com/cosmitar' target='_blank'>@cosmitar</a> & <a href='https://github.com/loverajoel' target='_blank'>@loverajoel</a> / Designed by <a href='https://dribbble.com/untallucas' target='_blank'>@untallucas</a> / Contribute in <a href='https://github.com/hAPPckathon/20v' target='_blank'>GitHub</a>
        </p>
        <p className='right'>
            Created using
            <a href='' target='_blank'>
                <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='116px' height='36px' viewBox='0 0 116 36' className='spotify-logo'>
                    <path d='M45.271,14.307c0-1.078,0.953-1.751,2.432-1.751c1.795,0,3.234,0.861,4.068,1.504 c0.259,0.18,0.352,0.176,0.489,0l1.426-2.014c0.108-0.134,0.163-0.256-0.059-0.432c-1.473-1.142-3.353-2.006-5.835-2.006 c-4.06,0-5.77,2.589-5.77,4.94c0,5.372,6.914,4.493,8.59,6.193c0.26,0.264,0.407,0.638,0.407,1.075 c0,1.336-1.331,1.845-2.662,1.845c-2.082,0-3.389-0.734-4.842-1.987c-0.148-0.129-0.273-0.146-0.403-0.002l-1.617,1.907 c-0.113,0.131-0.183,0.282,0.004,0.425c1.997,1.707,4.227,2.584,6.814,2.584c3.663,0,5.956-2.05,5.956-5.012 C54.269,15.458,45.271,17.518,45.271,14.307z'/>
                    <path d='M62.422,13.542c-1.98,0-3.003,0.895-3.894,1.848v-1.33c0-0.174-0.071-0.257-0.251-0.257h-2.64 c-0.271,0-0.305,0.068-0.305,0.305v15.673c0,0.18,0.071,0.261,0.261,0.261h2.63c0.202,0,0.305-0.063,0.305-0.304V24.84 c0.681,0.875,2.033,1.773,3.882,1.773c2.9,0,5.885-2.156,5.885-6.522C68.295,15.449,65.049,13.542,62.422,13.542z M61.784,23.775 c-1.974,0-3.321-1.752-3.321-3.683c0-1.918,1.261-3.71,3.321-3.71c1.64,0,3.267,1.289,3.267,3.732 C65.051,22.302,63.622,23.775,61.784,23.775z'/>
                    <path d='M80.613,15.431c-0.592-0.587-1.295-1.049-2.11-1.387c-0.814-0.336-1.698-0.505-2.651-0.505 c-0.968,0-1.859,0.172-2.674,0.517c-0.814,0.345-1.521,0.815-2.121,1.41c-0.6,0.596-1.068,1.29-1.407,2.081 c-0.338,0.791-0.507,1.642-0.507,2.55v0.047c0,0.909,0.169,1.76,0.507,2.553c0.339,0.791,0.804,1.479,1.396,2.067 s1.295,1.05,2.109,1.388c0.814,0.336,1.699,0.504,2.652,0.504c0.968,0,1.859-0.171,2.674-0.516 c0.814-0.346,1.521-0.816,2.121-1.411s1.068-1.288,1.406-2.081c0.339-0.791,0.508-1.642,0.508-2.551v-0.047 c0-0.909-0.169-1.759-0.508-2.55C81.67,16.709,81.205,16.019,80.613,15.431z M75.845,23.811c-2.295,0-3.511-2.027-3.511-3.744 c0-2.119,1.491-3.677,3.46-3.677c1.729,0,3.519,1.371,3.519,3.755C79.312,22.441,77.645,23.811,75.845,23.811z'/>
                    <path d='M90.492,13.803h-3.031v-3.021c0-0.206-0.074-0.304-0.305-0.304h-2.651c-0.213,0-0.261,0.118-0.261,0.261 v3.065h-1.348c-0.119,0-0.174,0.063-0.174,0.174v2.413c0,0.129,0.049,0.218,0.217,0.218h1.305v6.261 c0,2.351,1.214,3.701,3.696,3.701c1.135,0,1.845-0.252,2.55-0.604c0.115-0.064,0.188-0.139,0.188-0.271V23.52 c0-0.27-0.179-0.338-0.429-0.199c-0.259,0.117-0.785,0.35-1.482,0.35c-1.088,0-1.307-0.604-1.307-1.367v-5.695h3 c0.18,0,0.262-0.083,0.262-0.261v-2.283C90.723,13.873,90.625,13.803,90.492,13.803z'/>
                    <path d='M94.935,13.803h-2.69c-0.189,0-0.261,0.093-0.261,0.261v12.021c0,0.179,0.089,0.261,0.261,0.261h2.695 c0.17,0,0.261-0.057,0.261-0.261V14.066C95.2,13.917,95.138,13.803,94.935,13.803z'/>
                    <circle cx='93.611' cy='10.274' r='1.999'/>
                    <path d='M115.373,13.825h-2.825c-0.169,0-0.214,0.067-0.291,0.279l-2.904,8.321l-3.193-8.375 c-0.073-0.194-0.132-0.247-0.265-0.247h-4.738v-0.326c0-1.01,0.324-1.668,1.439-1.668c0.592,0,1.131,0.154,1.357,0.231 c0.296,0.106,0.465,0.063,0.465-0.171V9.564c0-0.134-0.051-0.201-0.203-0.247c-0.359-0.087-1.318-0.307-2.246-0.307 c-3.006,0-3.941,1.887-3.941,4.206v0.586h-1.306c-0.173,0-0.218,0.073-0.218,0.222v2.365l0.218,0.218h1.306v9.521 c0,0.135,0.066,0.217,0.217,0.217h2.738c0.15,0,0.217-0.076,0.217-0.217v-9.521h2.609l3.971,9.545 c-0.322,0.671-0.668,1.193-1.49,1.193c-0.636,0-1.203-0.279-1.426-0.391c-0.186-0.09-0.328-0.119-0.422,0.092l-0.822,1.807 c-0.113,0.211-0.205,0.419,0.002,0.513c0.893,0.419,1.619,0.737,2.967,0.737c2.818,0,3.51-1.937,4.215-3.555l4.733-12.275 C115.644,14.014,115.646,13.825,115.373,13.825z'/>
                    <path d='M18,0C8.059,0,0,8.059,0,18s8.059,18,18,18s18-8.059,18-18S27.942,0,18,0z M25.303,26.494 c-0.292,0-0.49-0.102-0.762-0.268c-2.609-1.578-5.861-2.406-9.314-2.406c-1.926,0-3.864,0.246-5.678,0.623 c-0.294,0.064-0.666,0.179-0.887,0.179c-0.684,0-1.139-0.544-1.139-1.132c0-0.757,0.436-1.133,0.979-1.236 c2.223-0.506,4.438-0.795,6.737-0.795c3.939,0,7.449,0.902,10.47,2.713c0.45,0.262,0.714,0.531,0.714,1.196 C26.423,26.018,25.895,26.494,25.303,26.494z M27.265,21.729c-0.391,0-0.636-0.156-0.902-0.311 c-2.928-1.738-6.986-2.892-11.43-2.892c-2.28,0-4.247,0.319-5.875,0.751c-0.351,0.098-0.547,0.201-0.875,0.201 c-0.774,0-1.406-0.631-1.406-1.411c0-0.765,0.371-1.292,1.12-1.503c2.023-0.556,4.09-0.984,7.097-0.984 c4.712,0,9.27,1.173,12.854,3.318c0.601,0.344,0.822,0.782,0.822,1.422C28.667,21.1,28.047,21.729,27.265,21.729z M29.498,16.188 c-0.366,0-0.583-0.089-0.927-0.277c-3.258-1.954-8.314-3.029-13.204-3.029c-2.441,0-4.92,0.248-7.191,0.864 c-0.262,0.065-0.592,0.197-0.923,0.197c-0.96,0-1.697-0.759-1.697-1.72c0-0.979,0.606-1.527,1.26-1.721 c2.566-0.756,5.43-1.108,8.544-1.108c5.286,0,10.847,1.087,14.909,3.473c0.547,0.31,0.927,0.778,0.927,1.635 C31.196,15.484,30.407,16.188,29.498,16.188z'/>
                </svg>
            </a>
             and
            <a href='' target='_blank'>
                <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='87px' height='36px' viewBox='0 0 87 36' className='youtube-logo'>
                    <path d='M28.927,11.742h3.271v17.391h-3.271v-1.894c-1.24,1.421-2.292,2.139-3.438,2.139 c-1.005,0-1.704-0.474-2.053-1.331c-0.212-0.521-0.363-1.335-0.363-2.53V11.742h3.271v12.914c0,0.73,0,1.033,0,1.206 c0.077,0.483,0.282,0.66,0.698,0.66c0.626,0,1.193-0.544,1.885-1.521V11.742z M19.629,13.292c0.66,0.878,1.033,2.274,1.033,4.132 v6.199c0,1.848-0.304,3.125-0.964,3.995c-0.872,1.186-2.308,1.814-3.685,1.814s-2.789-0.628-3.659-1.814 c-0.67-0.87-0.99-2.147-0.99-3.995l0.003-6.184c0-1.858,0.36-3.269,1.03-4.147c0.87-1.189,2.057-1.676,3.616-1.676 C17.391,11.616,18.758,12.103,19.629,13.292z M17.391,23.968l0.002-6.888c0.172-1.722-0.363-2.529-1.379-2.529 c-1.016,0-1.55,0.807-1.377,2.529v6.888c-0.172,1.722,0.361,2.576,1.377,2.576C17.029,26.544,17.563,25.689,17.391,23.968z M8.437,5.888l-2.405,9.07l-2.417-9.07H0c0.736,2.164,4.305,13.775,4.305,13.775v9.47h3.444v-9.47l4.304-13.775H8.437z M65.848,14.508c-0.513,0-1.101,0.271-1.623,0.786l-0.003,10.442c0.521,0.521,1.113,0.786,1.626,0.786 c0.899,0,1.305-0.66,1.305-2.382v-7.404C67.152,15.014,66.747,14.508,65.848,14.508z M78.689,16.578c0-1.592-0.412-2.07-1.445-2.07 c-1.042,0-1.482,0.439-1.482,2.048v1.904l2.927-0.003V16.578z M86.269,16.05v3.883c0,4.142-0.514,8.284-0.514,8.284 s-0.502,3.527-2.044,5.081c-1.955,2.039-4.147,2.049-5.152,2.168C71.365,35.984,60.561,36,60.561,36s-13.368-0.122-17.481-0.515 c-1.144-0.213-3.714-0.148-5.669-2.188c-1.542-1.553-2.043-5.081-2.043-5.081s-0.514-4.142-0.514-8.284V16.05 c0-4.142,0.514-8.284,0.514-8.284s0.502-3.527,2.043-5.081c1.956-2.039,4.146-2.049,5.152-2.168C49.757,0,60.55,0,60.55,0h0.022 c0,0,10.792,0,17.987,0.518c1.005,0.119,3.197,0.129,5.152,2.168c1.542,1.554,2.044,5.081,2.044,5.081S86.269,11.908,86.269,16.05z M46.146,9.332h3.788V6.06L39.086,6.064v3.268h3.616v19.801h3.443V9.332z M58.543,11.915h-3.271V25 c-0.692,0.977-1.259,1.521-1.885,1.521c-0.416,0-0.621-0.177-0.697-0.66c0-0.172,0-0.475,0-1.206V11.915h-3.271v13.603 c0,1.195,0.15,2.009,0.363,2.53c0.35,0.857,1.048,1.331,2.054,1.331c1.146,0,2.197-0.718,3.438-2.139v1.894h3.271V11.915z M70.424,17.08c0-1.63-0.209-2.744-0.417-3.436c-0.416-1.289-1.25-2.006-2.492-2.006c-1.146,0-2.287,0.706-3.293,1.944l0.003-7.522 h-3.099v23.073h3.099l0.004-1.734c1.042,1.289,2.177,1.956,3.286,1.956c1.241,0,2.148-0.665,2.564-1.944 c0.208-0.729,0.344-1.852,0.344-3.443V17.08z M75.762,24.132v-3.092h6.205l0-3.52c0-1.839-0.362-3.184-1.014-4.055 c-0.874-1.177-2.115-1.8-3.679-1.8c-1.591,0-2.833,0.623-3.734,1.8c-0.662,0.871-1.048,2.292-1.048,4.131v6.026 c0,1.829,0.425,3.108,1.087,3.969c0.901,1.176,2.143,1.763,3.773,1.763c1.629,0,2.908-0.616,3.771-1.865 c0.379-0.551,0.624-1.176,0.729-1.868c0.028-0.312,0.111-1.023,0.111-2.027v-0.488h-3.271c0,1.251,0.005,1.995-0.023,2.164c-0.178,0.833-0.625,1.251-1.393,1.251C76.203,26.521,75.751,25.721,75.762,24.132z'/>
                </svg>
            </a>
            APIs
        </p>
    </div>
);

export default Footer;