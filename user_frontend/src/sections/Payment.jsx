import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import vnpay from "../images/vnpay-logo-inkythuatso.svg";
import cod from "../images/cash-on-delivery-icon.svg";
import { Box, Stack, Typography } from "@mui/material";

function CheckoutMethods({ method, onChangeMethod }) {
  return (
    <>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="COD"
          name="radio-buttons-group"
          value={method}
          onChange={onChangeMethod}
        >
          <FormControlLabel
            value="COD"
            control={<Radio />}
            label={
              <Stack direction="row" alignItems="center" spacing="20px">
                <img src={cod} alt="" width={50} height={50} />
                <Box>
                  <Typography
                    sx={{ fontWeight: 500, textTransform: "uppercase" }}
                  >
                    Thanh toán khi nhận hàng
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    Khách hàng sẽ thanh toán bằng tiền mặt khi nhận được hàng
                  </Typography>
                </Box>
              </Stack>
            }
          />
          <Divider sx={{ marginY: 4 }} orientation="horizontal" />
          <FormControlLabel
            value="VnPay"
            control={<Radio />}
            label={
              <Stack direction="row" alignItems="center" spacing="20px">
                <img src={vnpay} alt="" width={50} height={50} />
                <Box>
                  <Typography
                    sx={{ fontWeight: 500, textTransform: "uppercase" }}
                  >
                    "Thanh toán qua VNPay"
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    Khách hàng sẽ được chuyển đến trang VNPay để thanh toán
                  </Typography>
                </Box>
              </Stack>
            }
          />
          <Divider sx={{ marginY: 4 }} orientation="horizontal" />
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default CheckoutMethods;
