export const formatPrice = (price: number | null) => {
    if(!price){
        return "R$ 0,00"
    }else{
        return new Intl.NumberFormat("pt-BR", {
            style: 'currency',
            currency: 'BRL',
        }).format(price / 100);
    }
}