package com.sd.prj_planta_serv_pmml.services;

import com.sd.prj_planta_serv_pmml.dtos.ClasseRecordDTO;
import com.sd.prj_planta_serv_pmml.dtos.FlorRecordDTO;
import org.pmml4s.model.Model;
import org.springframework.stereotype.Service;


import java.io.FileInputStream;
import java.util.HashMap;
import java.util.Map;

@Service
public class ClassificarService {

    public ClasseRecordDTO classificar(FlorRecordDTO florRecordDTO) {
        FileInputStream fis = null;
        Map<String, Object> saida = null;

        try{
            if(florRecordDTO.classifica().toLowerCase().equals("svm")){
                fis = new FileInputStream("D:\\pmml\\knimeSvmIris.pmml");
            }
            else if(florRecordDTO.classifica().toLowerCase().equals("decision tree")){
                fis = new FileInputStream("D:\\pmml\\knimeDtIris.pmml");
            }
            else {
                fis = new FileInputStream("D:\\pmml\\knimeDtIris.pmml");
            }

            Model model = Model.fromInputStream(fis);

            saida = model.predict(new HashMap<String, Object>() {{
                put("SepalLengthCm", florRecordDTO.comprimento_sepala());
                put("SepalWidthCm", florRecordDTO.largura_sepala());
                put("PetalLengthCm", florRecordDTO.comprimento_petala());
                put("PetalWidthCm", florRecordDTO.largura_petala());
            }});
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        String classe = saida.get("predict_Species").toString();
        if(classe.contains("-")){
            classe = classe.replace("-", "");
        }
        if(classe.contains("Iris")){
            classe = classe.replace("Iris", "");
        }

        ClasseRecordDTO  classeRecordDTO = new ClasseRecordDTO(classe);
        return classeRecordDTO;

    }
}
