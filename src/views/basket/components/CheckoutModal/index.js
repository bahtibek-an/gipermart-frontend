import React from "react";
import { Box, Button, Modal, Paper, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};

const CheckoutModal = ({ showModal, data }) => {

    return (
        <Modal
          open={showModal}
        >
          <Box sx={{ ...style}}>
            <Paper sx={{ borderRadius: 0, padding: '40px' }}>
              <Stack sx={{ gap: '1rem' }}>
                <h2 className="font-medium text-2xl">Заказ № {data?.cart?.[0]} оформлен</h2>
                <p className="mt-4">Отслеживать статус заказа можно в личном кабинете</p>
                <div className="mt-8 flex">
                  <Button
                    className={`!mr-4 yellow-btn-hover !rounded-none !py-3 !text-base !w-full`}
                  >
                    <Link to="/profile/order">
                      Смотреть заказы
                    </Link>
                  </Button>
                  <Button
                    className={`yellow-btn-hover !rounded-none !py-3 !text-base !w-full`}
                  >
                    <Link to="/">
                      Продолжить покупки
                    </Link>
                  </Button>
                </div>
              </Stack>
            </Paper>
          </Box>
        </Modal>
    );
}

export default CheckoutModal;