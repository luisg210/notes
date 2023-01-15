import Swal from "sweetalert2"

const showErrorAlert = msg => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: msg,
        background: '#353535',
        color: '#fff',
    });
}

const showSuccessAlert = msg => {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: msg,
        background: '#353535',
        color: '#fff',
    });
}

const showQuestionalert = msg => {
    return Swal.fire({
        icon: 'question',
        title: 'Question',
        text: msg,
        background: '#353535',
        color: '#fff',
        showCancelButton: true,
        confirmButtonText: 'Yes'
    });
}

export {
    showErrorAlert,
    showSuccessAlert,
    showQuestionalert
}