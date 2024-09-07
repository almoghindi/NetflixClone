import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../../../store/store";


const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const icons = [
    { id: 1, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYSw2XUJOe-RXGqlMhzAK2kb3m8jiiuICaICOYRemQXvfBcEmoaG0XMebWDsKrQ4fhsAYwzopxK6Cm5l5w2F9iMzCVqZuapW7A.png?r=201" },
    { id: 2, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABVAOVZB6hbXn66eL28YYwIrZ3y7G9clKxQtWp-2Dc1_uq2MuLsPa_mD3N1jJlpMc_61au7gZ69iuTZmeg_YjE-5YKAGbR8JFKg.png?r=7c7" },
    { id: 3, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABcD0ZrsIMMPdVENlhcMLhAEQsGSplhivXwxPolt5h1wP1bquIL83x4fkrS6we4cwNWTe1nn7exw7GDMLe-72PiRcoMIBjdjmmA.png?r=b39" },
    { id: 4, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABQF7SR467QFM7baRi8ZVxwtPaStoMd9-KZ8qZqba8Tuu8x9OWqkYvzubJwrfBQmJp0spenD2JvuyNz7H1OuY3zhTr6_hZokHwQ.png?r=6a6" },
    { id: 5, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABWP7dngMuFj6d4Hr3kCkJAijucivMNIbY6ak4NJtbCgEWKSEqE_31Kp6kTIip3kS0JUhEnA78GnsLSq0M829d2jpc4aqffP5ng.png?r=558" },
    { id: 6, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABeKAhhelX-wz_RiGf_mTrXQgLH9heqmzLj3VTGX3aATuJpHuRGWC_BHqa2yc7HXPSgQ9bfDKD5aXWG7yPRSIYNRVj1CSfDpqNw.png?r=cad" },
    { id: 7, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABRNxh2T8XhS7jBOLKwI1j-R0CJFhtTa-nxz5EhkX0EL4ue-amefp4mC1fsf0-rd8vynj9TXF2unD7iD4vFlh5kp5XCMtfUa4NA.png?r=a16" },
    { id: 8, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABQbPHLHMADSYHIjUxUrTHwEeJXOX-rF9NpbKyfLmXJnukropAUAR-faZGpu9eIgjUKX5udaZMo6Wze-ifSqCOKW7CfizWSlYJg.png?r=eea" },
    { id: 9, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABSQGQWkzf71tVsbzO1dU6kvtezyXhoWTkUzebNS_MSeRVGdckDNMVs1q7DIks1J_qGDNfrVjr2OEZvTPsNq9zBLKCbgRvCj-RA.png?r=d47" },
    { id: 10, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABafGsF7RLiQlTUx1eVpITxBZ5Me8s0M3fvgIbDNpwk1-2dnsNGRdzVOyajfwonpnfF3MKRdPt2l5GejDXr3cbGE8fVV1YWdHhw.png?r=ce4" },
    { id: 11, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABd148B0ZT3d_N6KcgB2_xM2k57VsubEa0FQBp3lj_WPe1m9Zzbgq_KkVdLNfvUmTN5hm7kvTTd0JF9QMxEjW_-TaX5u9vo2QBg.png?r=181" },
    { id: 12, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdxbwI5TRu89nI_cd6jTv-IflvV5Zk6Cs4_ZbL9TqcYqro8KZ6RonjEQZn0ZSkwYJ50xjR6_nbqnnvwVYYCaTagdYdV3aQrkqA.png?r=ae9" },
    { id: 13, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABWkqCkPdPuyQh9kOjmHPTUZfwG-R8QZbs-drqkZh8qzWeyICABKFknYDnpl_2Nj4pYCA3UxVu3IjuFjW_B_3D5_5I9R4ynhH1g.png?r=ab6" },
    { id: 14, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABXwk27Bpx7x-kivs1O83w6DTP0-5K9aJskVTGucM5M61FxBrnaQitmkf2uIii7wv6Zcvic2v1Q-rmaEB9qkES8OQ4tPrsHhXwQ.png?r=bb0" },
    { id: 15, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABRaGfMeG37Ayx3OwvsEqeTlSVvQWzVOiEfYQ8GRHx3zhx81IZy88ZnGN-cU7XLgoc-fIvFfp1ue_Pl-Vqw2cL7KiX5BRdj7z1g.png?r=59d" },
    { id: 16, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABcVQpnZKvDFkrGbvZ1Z5QXziVqAK3aaBrGCqsgltpUilQBRAFFYvmyqlRlZF3WubCdfFfzDnVyeNa3kFjxLgif-qYdfJbpj8VQ.png?r=15e" },
    { id: 17, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfMnIhIdkM8LdU5BZaYVaxoVTrMGzIjafPBzCQUwebzxeK7JKvcI7-Jm-5AituzcdJYIT_45NSkbbTwfVva-E01G9J1YVVBveA.png?r=e6e" },
    { id: 18, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABWdAPWT0Vb3Eth37phC9Wplk4PJYY04xKlrvLf6eD_pjXTNUMjeq7Q8DgqgYbj8qbJr-766Vmg-Z3YSsEOxObXKphMTFZd-A8g.png?r=bd7" },
    { id: 19, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABZf5kiIAuiZG_DvLse1xSkgukFUqHQQR5d6qSDQBlw720nd7cYHcXavvtFNfg5814g1njOdPHGbrKYs9KdWq9hnEqL2-xxh5MA.png?r=1d4" },
    { id: 20, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABV0j-bGEVAaWomcgXqIMEfw-h-in8B5DB_edifknx-3aNWWIQKU1KMFN9OZtzQMTCYp2ovDEaPHJlCkDBmdtDUTJwUb0-c_BBg.png?r=a4b" },
    { id: 21, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABUoj4FT-0Rr558WbETiintMnmH2JKw4l_p4MdMoxqVx7YXwsvLvvnGUtx3HKZN_BJFH4EHpXn5KqSCBVxLrRz0n4gk64yyeAFw.png?r=229" },
    { id: 22, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABSVY0nClWjEeYZcqCRHYlGkM3xLJGCigAOsoESa7WaW8hH_99_LBnn4U8OrZJp78wh2FvQH3YGDKCmnKx0L_iT5bc8tc2A8AYQ.png?r=98e" },
    { id: 23, src: "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABRALaKaonY6GfYhbjPRi6y9-yRNzLhI4bjZmc95qXOZODKsLQm6mxPAoEPA9ukfvHSo_OYWkmO1akAmMPTKzig9XzSYimmYUUA.png?r=54c" },
    { id:24, src:  'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABaOUM79jMcgAlMo2ew01lkY2HzpiaJMoRZP1fRkjgxX_b06h7opq67-JgtaI9oAP48rlNMt1fzgKrcps2L_VfJ83JkX5WdJRdg.png?r=937'},
    { id:25, src:  'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABQLGmFynSN-44kcdclbjgaSIgThBZ9NqR31wLt0s4wvec8XoDyc6eNvapsKe-xy6CJEbWVpshUoyer1WwfMKLy0AplsmtNhATg.png?r=2e5'},
    { id:26, src:  'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABUZFF0kWBRJVZNgKrAe3D4RP7hVcDwYVaJd4ROmE9oDJzuuXRBlzWx7DQEbQf1uAsQ71xp0mFdT7_KxwMPGYu4BvktLMMrj2Ew.png?r=8ff'},
    { id:27, src:  'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABf1XHT99QnZ7MmHaGNaI5sRIMR1bu68SaTpoYqT_13xpZoeQy-hm5sAtXo_cMDKJ4mokmMEk4bIGbrsCbsSNJqxpXZG8XuxTdQ.png?r=eda'},
    { id:28, src:  'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbsINg7v_-e4oLhP4bIco6QLue0zRB25qhI8YGD60_p6ChAszw5Yn7Ip_gbcp9lInsQw4E3WzKgjmOOcQuVBSOubr90ravfdTQ.png?r=00c'},
    { id:29, src:  'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABZ_xmd46cR7ogp3-v6igxij6YoADQGZiYG-_Blhg_2xQL0swkEzzD2IFz0B-gcsybFwBk2VBvkPke8d8YPGflZhHROyXzD7C7A.png?r=8d9'},
    { id:30, src:  'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYdryxLGMoUVoWhTzo5qv1LBoVATobVMkXCgmlfHJz6vSPiv34nrYAwipKRu7CS4rP89JH5FND2PT6APknPK0Hb26oexfuEEdQ.png?r=19c'},
    { id:31, src:'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABTQbFxa9w8aqH8hNGnrB1RVrDXcw0Bitj5SOEppnLp16830u6slREYRvtCBUXfdZvE92maFTTic89CEVf6hFvZunZprgoJ6j-Q.png?r=0a8'},
    { id:32, src:'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABZi_VRbSOKgsO8bju6ZpiqgJv74SBIMCfpiQEpjwrsPpzWCcB0n9zV3z-31EOOgctmhaIsV03O-h50kH3Foq8pKPbcnQk-fwQg.png?r=0d4'},
    { id:33, src:'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfmnTRPNuqpIy_q8Ad4f6R9U4-5YYgIC32_phidixK7Zg0ouYjyIO15-WBlMKED9cIffMnSjmX10ibrIeOfOh8Hw8sRba6e7Ig.png?r=fae'},
    { id:34, src:'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABXg_S6wo_gNEXqi5T1GQ9ln0WpFyOZ-X6Lv3jN7Ebmbh48xuRwv64VL7HT_c5bqbh-g8IAzbVDbkonesQ6Sj-aKFUUhFYp6zew.png?r=c1a'},
    { id:35, src:'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABQP6hh5J0NYGp6SPcYZRnQmFSsoAWtTAA2fOTTW0Qw0_vvIctIcsHJ--vyBDvb3AzZK8Zy2iZc-BrTccVe5-N5WdYU1nLLFIcg.png?r=079'},
    { id:36, src:'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYKaSKsGZLWhBL8lBYhocSuccYGpZOwUYgshUO0uyZ0GbU1v30mOkrl4pk0YFYmxayBo-ulHOO5XnCXxJxxK8h3fsE8ZoWLCQQ.png?r=664'},
    { id:37, src:'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABU_mAB99YhBuRjgQnNnx3OWePgfqQfuZmtUgxFCKyVoDs3ufAkMQjTtiUd0Dsrro2rQ0rUwNv6S7KAD4hbowI3UYszZOWzUYfA.png?r=82b'},
    { id:38, src:'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABSJea8aPaoRAGUf3W6LPaNtPj80j07WeJM5ErpkqZehCn9CC2r8R8crNoAKg0YinjC3tik7fdQHgpAhcWK2BaYfYgpSHO_hjWw.png?r=8d8'},
    { id:39, src:'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABXPRbbrpQUhlhwjTxlbEqtzm_WIRF_0IBGOhrxqES5nfnvFWR5GeLrpUUA-gCcdWdSJJlVaAp1MvWxA1T1jDhIItaE3LpCItjg.png?r=5c1'},
    { id:40, src:'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfe9W7pZvVJKaS9e4grBC8bE8WW5m3ivZg8tpZWlYHVEoIfDN2CzAuKNfiPaL3V8heNnzwDw650AeRwkYlLQ9DUQclOHbEFJMg.png?r=fcd'},
    { id:41, src:'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABUjIe4yV0dCFMoevPjk6bsIrIAy_GC49k9k6qfN47zFrSpkJ9z5pxOXpY0sd3Qcr1TADWFEwmYQPcvrVlfa64O_gVEyMtwSbiA.png?r=f6a'},
    { id:42, src:'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABQRUHq857vu95XpNjytjdX5CZLN7azFWPt3R-GN1hwkRnDushRAMyLkJIhfCqQlDMK7QeUBeeIU6oAEn3KHn5ba7j70uZm9ydw.png?r=a73'},
    { id:43, src:'https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABedvqbPVl3nsJcqjGG7YVKfYubVzBC2ZlNGBuF_8hqrN0grWzYx0IaGgKGMF8QoTfxIw_ajRgc0SMXdbY4eyMFPcSNmO8IPChw.png?r=a83'},
]




const EditProfileIcon: React.FC = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const { returnTo = "/profiles/add", currentIcon = "https://occ-0-3945-2567.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYSw2XUJOe-RXGqlMhzAK2kb3m8jiiuICaICOYRemQXvfBcEmoaG0XMebWDsKrQ4fhsAYwzopxK6Cm5l5w2F9iMzCVqZuapW7A.png?r=201" } = location.state || {};

  console.log("Location state:", location.state);
  console.log("returnTo:", returnTo);
  console.log("currentIcon:", currentIcon);

  const handleGoBack = () => {
    navigate(returnTo);
  };

  const handleIconSelect = (newIconSrc: string) => {
    console.log("Selected icon:", newIconSrc);
    if (location.state === null) {
        navigate(`/profiles/manage/edit/${user?.profileId}?newIcon=${encodeURIComponent(newIconSrc)}`)
    }
    else{
        navigate(`${returnTo}?newIcon=${encodeURIComponent(newIconSrc)}`);

    }
  };

  const blackMirrorIcons = icons.slice(23, 30); // Assuming icons array is available in scope

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center cursor-pointer" onClick={handleGoBack}>
            <ArrowLeftIcon />
            <div className="ml-4">
              <h1 className="text-white text-2xl font-bold">Edit Profile</h1>
              <p className="text-gray-400 text-sm">Choose a profile icon.</p>
            </div>
          </div>
          <div className="flex items-center">
            <img
              src={currentIcon}
              alt="Current Profile"
              className="w-10 h-10 rounded"
            />
          </div>
        </div>

        {/* Main Icon Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-12">
          {icons.slice(0, 23).map((icon) => (
            <img
              key={icon.id}
              src={icon.src}
              alt={`Icon ${icon.id}`}
              className="w-full aspect-square object-cover rounded cursor-pointer hover:border-2 hover:border-white transition-all"
              onClick={() => handleIconSelect(icon.src)}
            />
          ))}
        </div>

        {/* Black Mirror Section */}
          <h2 className="text-white text-3xl font-bold mb-6 relative">
            <span className="bg-black pr-4">Black Mirror</span>
            <div className="absolute bottom-3 left-0 w-full h-px bg-gray-800 -z-10"></div>
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 mb-12">
            {blackMirrorIcons.map((icon) => (
              <img
                key={icon.id}
                src={icon.src}
                alt={`Black Mirror Icon ${icon.id}`}
                className="w-full aspect-square object-cover rounded cursor-pointer hover:border-2 hover:border-white transition-all"
                onClick={() => handleIconSelect(icon.src)}
              />
            ))}
          </div>
          
          <h2 className="text-white text-3xl font-bold mb-6 relative">
          <span className="bg-black pr-4">Our Planet</span>
          <div className="absolute bottom-3 left-0 w-full h-px bg-gray-800 -z-10"></div>
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-12">
          {icons.slice(30, 43).map((icon) => (
            <img
              key={icon.id}
              src={icon.src}
              alt={`Icon ${icon.id}`}
              className="w-full aspect-square object-cover rounded cursor-pointer hover:border-2 hover:border-white transition-all"
              onClick={() => handleIconSelect(icon.src)}
            />
          ))}
        </div>
        </div>
      </div>
  );
};

export default EditProfileIcon;