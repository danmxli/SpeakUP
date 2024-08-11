from flask import jsonify
import numpy as np
import parselmouth
from parselmouth.praat import run_file


def collect_metrics(filename, p):
    sound = p + "/" + filename
    sourcerun = p + "/solution.praat"
    path = p + "/"
    
    try:
        objects = run_file(sourcerun, -20, 2, 0.3, "yes", sound, path, 80, 400, 0.01, capture_output=True)
        
        z1 = str(objects[1])
        z2 = z1.strip().split()
        z3 = np.array(z2)
        
        return {
            "number_of_syllables": float(z3[0]),
            "number_of_pauses": float(z3[1]),
            "rate_of_speech": float(z3[2]),
            "articulation_rate": float(z3[3]),
            "speaking_duration": float(z3[4]),
            "original_duration": float(z3[5]),
            "balance": float(z3[6]),
            "f0_mean": float(z3[7]),
            "f0_std": float(z3[8]),
            "f0_median": float(z3[9]),
            "f0_min": float(z3[10]),
            "f0_max": float(z3[11]),
            "f0_quantile25": float(z3[12]),
            "f0_quan75": float(z3[13])
        }

    except Exception as e:
        return {
            "error": str(e)
        }