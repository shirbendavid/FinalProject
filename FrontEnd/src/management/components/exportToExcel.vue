<template>
  <div>
    <vue-excel-xlsx
        :data="data"
        :columns="columns"
        :filename="'filename'"
        :sheetname="'sheetname'"
        >
        Download
    </vue-excel-xlsx>
  </div>
</template>

<script>
export default {
          data() {
            return {
                columns : [
                    {
                        label: "Product",
                        field: "product",
                    },
                    {
                        label: "Price",
                        field: "price",
                        dataFormat: this.priceFormat
                    },
                    {
                        label: "Quantity",
                        field: "quantity",
                    },
                ],
                data : [
                    {
                        product: "Beverage",
                        price: 10,
                        quantity: 2
                    },
                    {
                        product: "Snack",
                        price: 12,
                        quantity: 6
                    },
                    {
                        product: "Beverage",
                        price: 10,
                        quantity: 5
                    },
                    {
                        product: "Snack",
                        price: 12,
                        quantity: 3
                    }
                ],
            }
        },
        methods: {
            priceFormat(value){
                return '$ ' + value;
            }
        }
}
</script>

<style lang="scss" scoped></style>
