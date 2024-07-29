import React from 'react';
import { motion } from 'framer-motion';

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 flex flex-col items-center justify-center text-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mb-8"
      >
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEBUQEhIVEhUVFhUVGBgWGBUYFRcZFRYWFxUXExYYHSghGRomGxcVITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLSsvLS8rLS0tLSstLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgEDBAUHAgj/xABQEAABAwIDAwYGCwsNAQEAAAABAAIDBBEFEiEGMUEHEyJRYXEUMnOBkbIVFyM0QlNykpOh0jVSVGJjgqKxw9HTFjM2Q0Rkg5SzwcLh8HQk/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECBAMF/8QAKBEAAwABBAAFBAMBAAAAAAAAAAECEQMSITEEIkFRYRMyQnEUM4FS/9oADAMBAAIRAxEAPwDuKx6ipDdN5SqmyjTeVrSVx1NTHCM+trbeF2XJKhx427lbJVEWZtvsyOm+wiIoKhERAEREAREQBFamqWM1e9rPlOA/WVhSbQUbd9VAP8WP96nDJwzZItYzaKjO6qgP+Kz96zIKyKTxJGP+S5p/UUwxhl9ERQQEREAREQBERAFcZO4biraKU2uiVTXRsYKsO0OhWUtIthRz30O9aNPUzwzXo62eGZaLzdF3NJrKp93H0KyqkqiwN5eTzKeXkIiKCoREQBEUd2o2xpqAFrjzkttImEZuzOdzB369QKlJvolS28IkSjON7d0VKS0yc88fBi6W7g53ijuvfsXK9odsqutu17+bj+Lju1tvxzvee/TsCjy7zo+5qjw/rRPsU5Uql9xBEyEcC73R/wBdmj0FReu2lrZ/5yqld2B2RvzWWH1LVIuyiV0jvOnK6QfqbnU9Z1PpVFVFYuUQDW/FVRAbGix6rh/mqmZnZncW/Nddv1KTYXynVkdhM2OoHWRkf6WDL+ioQiq5T7KuJfaO2YLyiUVRZr3GneeEvi+aQdEeeylrHAgEEEHUEag9oPFfMy2+A7TVVEfcZLN4xu6UZ72nd3gg9q5Vo+xnrw6/E+g0UR2V29p6y0cloJjplceg4/k39f4pse9S5Z3LT5M1S54YREUFQiIgC9xPykFeEREp4eTb84EWr5wotH1jV/JPCIizmQIiIAhNtUJsuQcoG25qS6lpnEQA2e8b5ewfk/W7t94h0y8Q7eEbHbTlE8anondjpx+qH7fo61zRziSSSSSbknUkneSTvKoi1zKlcG+IUrgIiKxcIiIAiIgCIiAIiIAiIgKKe7GcoL4LQVZMkW4Sb5I+/wC/b9Y7dygaKHKrsrUqlhn0vBM2Roexwc1wBa4G4IO4ghe1w/YfbB9A/m33fTuPSaNTGT8OMfrbx79/bKedsjGyMcHscA5rgbgg6ggrHcOWYNTTcMuIiKhzCIiAIiIAiIgCIo7t1tF4BSlzSOdkuyIdvF5HU0a99hxUpZeCUm3hET5UNrd9BA7sncO3+qH/AC8w61zNVc4kkkkkkkk6kk6kk8SqLbMqVg9KIUrCCIisWCIiAIikOx2ykmIS8WQsI5yT68jOt5Fu69zwBhtLlkNpLLI8tq3ZmtIuKSex/Jv/AHLov8iMMjkFUKktiicMzTJGY88btznnUaixbe/duWHjfKWWVbW0+SSmGTO4tdndqecyG40tYDTeCue9v7Ucvqt/ajmtTTvjcWSMcxzdC1wLXDvBVtdgxPAsOxeXwttV4rWiQMcwdFt7Zw4ZozbS54elRfbXYlsEYrKMmWnIBcAc+QHc9rh40Z69bb723StRPsmdVPh9kHREXQ6hERAEREAU45N9rfBZBSzO9wkPRJ3Rvcd/Yxx39R161B1RRSTWCtSqWGfTaKE8mO0nhUHg8jrywgAE73x7mu7SPFPmPFTZYqWHg86pcvDCIiqVCIiAIiIAuC7dY54bWPeDeNnucfVladXfnG57rdS6pyi4v4LQSFps+X3FnX0wc5HczMe+y4UtGjPqa/Dx+TKoiLQagiIgCIiAout8n+eLCZxUh0ETTKWus5kmRzLvcNx3k2K51sk0GvpgRf3aP1gpzysYvVMPgzW2p3sYXPyO6Tszjk5zd8FptvXK+WpOOry1JBtmtn5a+bmorAABz3u8VjdwLrbyeA469pU5fsRhUJEM1aRMeBlhYbnd0C0285Tk/eYcHrJ4dZgZiOJBZCws042uTbtXMXG5JJuSSSTqSTqSSd5PWp5pvDwPNTaTxglO2exUmH2la7noHHLntZzSdQJANLHg4aHs0vL9jpXewUop7yTNE4LTc2cbnK1vyCCBxJ7SsfZOQzYDUxzasjbM1hPBrGNe23yXbuqw6lGOT7F6qCpbFA3OyWSMStyFwDcwaX3Hi2aTru0VXlp59CrzSafoyMSRlhLXNLSNCHAgjvB3Lyp1ywgeHR//ADt/1JQoKusvKydordKYREUlgiIgCoqogNhs/izqOpjqGfAPSH3zTo9vnF/PY8F9DU07ZGNkYczXtDmkcQ4XB9C+aF2DkkxfnaV1M49KB3R6+bk1HodnHdlXHWnjJm8RGVuJ2iIspjCIiAIiIDkXK/iOeqjpwdImZiPx5NdfzQ35ygS2u1dZz9dUS9crwO5nubf0WhapboWJwelpziUgiIrFwiIgCIiAuU07o3tkYcrmODmkcC03B9K65s/XyYthlSyqDW+MwSBoa05Wte19utrrE20XH1ONgNrWQNNDVAGnkLgHEXDDJfM2TrY6+/hfXTdz1FlZRy1ZbWV2YOwW1fgEjmSAugltmAFy1w0DwOOmhHUB1WMmk2ZwSd3Psq2xsOpY2WNre4NeMze7hwV+fZTBc3gwmDZnm7CJruGY9FrQSWHeLAgk9u9RHHNiKiCrbTxMkmY/JllEb8gDzl6ZAIaQQb67rHiqZlvh4KZmnlNo2u2W1VO2mGHUAtFue8XDS0G5awnVxJ1Ljv7bkjb7CDwTBpqyICWV3OPyjhzd2NDt2gsXnscqDYzCaS0VXUZ5ZPFzyc3a+5zWsIsLje+44K3tJj9PhlN7H0NnPLTnfcOy5xZznOGjpCOG4abgAFHDW1FeGtso5/jmMzVsvPTuDnZQ0WADWtFyA0Dhck+dY+GUT6iZkEdi+RwaLnTXiT1AXPmU+2G2ZggpxilaW5GjPG06taAbB7gPGcT4re0cd2e/bbCoz4VFTl1Q7QgRhrxpvc89Eb9S0kldN/pKOj1McSjT+1VV/H0/pl+woXilC+mmkgksHxuLXWNx2EHqIII71vTttUeH+GZnhue/Mc4/m8uXLltu3a3tv1UvZtthUp8KlpyKhu4GMPedPgvHRNuBcQRwTNrvkKrntZOUqq6Ptts5BUU5xWiLcpGeRo0a4A2c5o+C8G4c3jY8d/OFaa3LJ0ilSyERFYsFKeTXEeYxGME2bNeE9V3as8+cNHnUWXunnMb2yN3sc1472EOH1hRSysFaWU0fS6LxDKHta8bnAOHcRcL2sB5oREQgK1VS5I3v+9a53zQT/srq1u0z8tFUnqgl9Ryldkrs+d8xOp3nU953oqKq3nqBERAZ2AUrZquCF9y18sbXWNiQ5wBF+5dNxumwOil5meANeWh9g2dwsSQNQbfBK5zsl7/pfLxeuFIOVz7oN8hH68q5Us0kcbW60sksjwvBXUhrhTjmRfpWmzaOyHoXvvVcFwrBayOSSGnDmxeNcTNtoToCddBwVjZDDhW4F4MJAwuMjS62bKeeL9W3HC3Hitls7s17F0tSHziQPaXXyc2G5WOGt3G+9cn68s4PjKy85NHQS7PzyMijgu6Rwa0FlQAS7QXJOii3KNhMNJW83AzIwxMfluSASXA2ub26I+tazY339S+Wi9YKQ8rv3QHkI/XkXVLFYOyW20skLheWODmmxaQ4EcCDcH0gehTdvKnW2sYqY9uSXXzc4oMi6OU+zrUquzPx3GJa2d1RNlzOAFmghoDRYBoJJt3k71ZwvD5KmZkEQBe8kNF7DQFxueAABPmWMpJycOAxWmv1yjzmGQD6yofC4D8s8E3rqV2F4FJBMWyPfnjAvdgMxIAYSAbNF394KjOwWycVQx9bVnLTx30Jyh2UXe57uDB2bzfq1yeVTBals76tzs0DnMawZnExnI0EFh0bdzXHTrWyw6J1Ts46KDV7Mwc1u8lk3OObbiSwjTjdcvx49Tgn5M57Z5/ljg9+Z8CHNbs3Mx2t15fGt9fYtPt3spDBEyuozmp5MtwDma3OLscw78h3a7iR16Qi/FdRrIXU2zQjnuHvy5WneOcnEjW2OoIZc24WVmtrWCznY1hmVhkDsTwJtPCRFIzLERchhMTgbPI1s5tnd5XMMVw6SlmdBKMr2WvY3GoDgQRvFiFMOS7Bal87KxjskDHOa8ZnAyHIdA0CzgC5p16lrOU1wOKTdgjHn5tuiTxTSJji3K/ZF0RF1OwREQH0DsZUc5h9M47+ZYD3tGU/W1blRjk1ffDIOznB6JXqTrDS5Z5lrzMIiKpULWbUMzUNSPyEvqOWzVivhzxSM++Y9vzmkf7qV2Suz5sRUA61Vbz1AiIgNrsl7/pvLxeuFIOV37oN8hH68qj+yXv+l8vF64Uy26np48aifVMMkIgZmaNd5mykjiAbGy5t+f8Aw5V/Yv0zm+VMvYunezmAfgg+h/7VPZzAPwQfQf8Aab37MfUf/LITsj7/AKby8frBSDld+6A8hH68i9yVtBLiVEaGExAStz9HKHXe3LZt946WvaF45XPugPIR+vImc2iM5tP4ISiIuh2CIiA6zRRvds681Gaa8Uj2Wu54GYmIuOviu6V+AHYoHsntRNhzy5gzxvtnjJIa63Fp+C4dfVv4LO2H2wdQO5uTNJTvN3N3lhO9zL8OtvHfv3zKh2vw+tmbh/gt4nHLGXMj5vNY/A3svuBGtzwXDmc8cGdpzlNZRgHb7DM/P+AO5/fm5unzX6+czX89rqH7WbUTYi8OeAyNh6LAbhpPwnO4uO6+mm5TN3Jl/wDuzgs8Ez5ubzP5zLlvk3bs3425Zldtdh9FM6gFLaJpyyFrIyy9gdWb377EnW44onOcyskJyn5FllqZj27ONNPmgIja917teQJLylrt/SNyDxBtxXJyVLNuNsnV7uajuynadGnQyEbnSAbgODeG/fuiavpppcnXTlpchERdDoEREB3LkzbbDIe0yH0yvUoWj2HhyYdTN/JNd8+7/wDkt4sNds82/uYREVSgREQHzttJSczWVEX3sr7fJLi5v6JC1ym/K3h3N1omA0nYCflx2Y79Hm1CFul5WT04eZTCIisWNrsl7/pvLxeuF1La/FMLiqAysg5yXm2nNzefoEuyi9+sO0XLdkvf9N5eL1wpByu/dBvkI/XlXKlmkcbnNpfBMNnKfCK/nBBSR+55c2aIN8fNa2uvilazD8UwKeRkTKQZpHNa28IAu42FzfRWORXfV91P+2WFs9yeV0FTBK8RZY5I3OtJc2aQTYZddyphJtNnLCTabJJi9ThGHVDWvpmslAbI0siBtqQ0g30N2lZmHVOG4u98ggErogwOdLHY2JdlAN+xyg/K77/b5BnryLacjP8Aa+6H9qo2+XcHC2bvU9+z2Afgg+gH71uK6DCIaSOtfSR81Lky2iBd7o0ubdt9NAVxt289/wDuuuV2CTVuCUcMOXMG07+kcos2NwOtj1hWqVOOS1wpxyZGz0GEV5eIKSP3PLmzRBvjZrW118UrTnHcA3eCD6AfvW25OtmKigM5nDPdBHlyOzeLnvfQW8YLjr957ykyqb5EQqp88HSNvcKovY6KspoGxZ3RlpaMpLXtcbOb5gubtcQQQSCDcEaEEbiDwK6XtV/R+k7qf/TcuZq+n0dNH7TZfyhrPwuo+lk/etc9xJJJJJJJJNySdSSTvKoivg6YQREUkhERAFVkZeQxvjOIaO9xsPrVFIuT7DvCMRhBF2xnnnf4di39PIobwskU8Js7nSwCONsY3Ma1o/NACuoiwHmMIiIQEREBEeVDCfCKBz2i74Dzo+Ta0g+bc/mhcSX009oIIIuCCCDuIO8FfPu1mCmiq5IPg+NGeuN18vo1b3tK06Nehr8Pf4s1CIi7mo2uyXv+m8vF64Ug5Xfug3yEfryqP7Je/wCl8vF64Um5UKZ02KxQstmkihY25sLukkAueq5XN/ev0cn/AGL9EPw7E5qZxdBK+IuFiWG1x1HrWf8Aytr/AMMm+cpB7VdZ8bT/ADpf4ae1XWfG0/zpf4aO4H1NP4IZW1sk7zJK90jzYFziSdNwv1di6HyM/wBr7of2q1snJbWgE85TmwvYOkuewXjWy5Gh777of2qi6TngrqVLh4ObO3nvK2dHtHWQsEcdTKxjdzQ42HYBwCyNmtl5sQdI2Ext5uxcXkgdMuDQMrST4p/8VvvarrPjaf50v8NWqpXZd3C4ZHZNqq5wLTVzEEWPTO4rThTr2q6z42n+dL/DWp2k2KqaCITSuie0uDOg5xIJBIuHNGmh3Iqn0E3HSJRtV/R+k7qf/TcuZrpm1X9H6Tup/wDTcuZqNPojR6/0IiLodQiIgCIiALq/I/hOSGSrcNZTkZ8hnjEd77j8xcxwugfUzRwR+NI4NHZ1uPYACe4L6Jw6iZTwsgYLNjaGjzcT2nf51x1qwsGfxF4WDIREWUxBERAEREAUR5R9nPDKbnI23mhBc229zfhs79LjtHapcimXh5LTTl5R8yKqnvKbsnzEhrIW+5SH3QD+reeI/EcfQe8KBLcq3LJ6M0qWUbXZL3/S+Xi9cKb8o2zdZU1rZqeFz2iKMZmuY2zmvedLuBuLg3XNqeZ0b2yMJa5pDmkbwWm4I86kvth4j8ePo4vsqlS85RS5rdlGV7B47/ev8yP4qeweO/3r/Mj+Ksb2w8R+PH0cX2U9sPEfjx9HF9lMV7IjF+yL78BxwggiqIOhBqAQR1Ec6pZyYYDU0nhHPwmLOIstyw3y85e2Vx6x6VDPbDxH48fRxfZT2w8R+PH0cX2VDmmscEVNtY4FPsli0Ti6KGaMnQlkrGEi+4lsguFk+weO/wB6/wAyP4qxvbDxH48fRxfZT2w8R+PH0cX2VOL+CcX8GT7B47/ev8yP4qsVWy2MTACWKeUA3AfMx4B3XAdIbFefbDxH48fRxfZT2w8R+PH0cX2UxfwMansiU7a0z4sCpopG5XsMDXDQ2IY4EXGi5atxjW1FXWMEc8udoOYANY0XsQCcoF959K06mE0uS+nLlchERXLhERAERSnYLZU182d4Ip4yC8/fneIx36X6h3hQ3hZIppLLJdyUbOc3Ga6QdKQWiB4R8X97radg7V0NUa0AAAAAaADcANwCqsVVueTzbp08hERVKhERAEREAREQHieFsjXMe0Oa4FrmkXBB0II6lxLbnY99A/nGXfTvPRdvLCdzJD+p3Hv39wVupgbIx0b2h7HCzmuFwQd4IV4tyzpp6jhnzSinG2mwMlLmnpgZIN5bqZIvNvczt3jj1qDLYqT6N80qWUVREUlgiIgCIiAIiIAiIgCIiAIilOx+xc1eRI68VODq8jV/ZEDv+VuHbuUNpdkOkllmFsnszLiEuRvRjbbnJLaNHU3reeAXdMMw+OmibDE3KxgsB+sk8STck9qYZh0VNE2GFgYxu4D6y48SeJKylk1LdMwauq7fwERFzOQREQBERAEV2oZZxH/tVaUtYeCaWHgIiKCAiIgChW1XJ5DVXlgtBKdTYe5PP4zR4p7R5wVNUVpprotNOXlHzrjOCVFG/JPE5nU7ex3yXjQ92/sC16+lqinZI0se1r2ne1wBae8FQjGuTCmlu6ne6nd9748foPSHmNuxaJ1k+zVHiE/uOQIpTinJ/XwXIiE7RxiOY/MNnegFRmohdGcsjHRu6ntLT6HAFdVSfR3VJ9M8IiKSwREQBFWJpecrQXO6mgk+gaqQ4XsPX1FiIHRtPwpvc/0T0vqUNpdkOku2R1ZOHYdNUv5uCN0rupo3dridGjtJAXTsG5LIWWdUyumP3jOgzznxj5sqndBQRU7BHDG2No4NAHp6z2lcq1kujhfiEuiCbLcmjI7S1hErt/ND+bHyz8M9m7vXQmtAAAAAGgA0A7AFVFnqnXZku3TywiIqlQiIgCIvTG3IHWhKWSmU9SLacyFVaPoGj+Oy1WQ5hcbwtct2sSppL6jep1NPPKL62lu5Rr0Xp8ZbvFl5WbBkaa7CIiEBERAEREAXiWJrxle0OHU4Aj0Fe0Qk01TsnQSaupIb9YaGn0tssF/J/hx/s9u6SUf8lJ0VlT9yVde5F2cn2HD+oJ75JT/yWZBsfh7NRSRH5Qz+sSt4ib69yd9e5ap6ZkYtGxrB1NaGj6ldRFUrkIiIQEREAREQBEXpjCdwuhKWTys6hg+EfMlPR8XehZq0aWnjlmrR0ceaiiKqLQagvKIgKSblqpd6Is+sZfEnhERZzIEREAREQBERAEREAREQBERAEREAREQBERAemb1tINyIu+iavD9lxVRFpNYREQH/2Q==" // Replace with another image URL
          alt="Dancing Logo"
          className="w-32 h-32"
        />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold mb-4"
      >
        Welcome to User Layout
      </motion.h1>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-xl mb-8"
      >
        Enjoy our beautifully animated layout
      </motion.p>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-500 py-2 px-4 rounded-full cursor-pointer shadow-lg"
      >
        <a href="/admin/dashboard" className="text-white font-semibold">
          <button>Explore Features</button>
        </a>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white text-black p-4 rounded-lg shadow-lg"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1j4ZmdoFlkonbVm7nltKVj4sMz_WCZdMDKw&s"
            alt="Inventory Item 1"
            className="w-full h-32 object-cover mb-2"
          />
          <h2 className="text-lg font-bold">Inventory Item 1</h2>
          <p className="text-sm">Description of Inventory Item 1</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white text-black p-4 rounded-lg shadow-lg"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDJ_GhVSXLRHT3WjtgQ9Olgkk6N_D29FDgFw&s" // Replace with another image URL
            alt="Inventory Item 2"
            className="w-full h-32 object-cover mb-2"
          />
          <h2 className="text-lg font-bold">Inventory Item 2</h2>
          <p className="text-sm">Description of Inventory Item 2</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white text-black p-4 rounded-lg shadow-lg"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbSQ-xnzta5fJenhjwEgnb5X2XZ2slXfQuow&s"
            alt="Inventory Item 3"
            className="w-full h-32 object-cover mb-2"
          />
          <h2 className="text-lg font-bold">Inventory Item 3</h2>
          <p className="text-sm">Description of Inventory Item 3</p>
        </motion.div>
        {/* Add more inventory items as needed */}
      </div>
    </div>
  );
}

export default UserLayout;
