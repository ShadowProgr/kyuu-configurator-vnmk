function updateRenders() {
    // Case
    if (!$("input[type='radio'][name='grp-layout']:checked").length ||
        !$("input[type='radio'][name='grp-case-color']:checked").length)
        return;
    const layout = $("input[type='radio'][name='grp-layout']:checked").attr("id").replace("case-", "");
    const caseColor = $("input[type='radio'][name='grp-case-color']:checked").attr("id").replace("case-", "");
    $(".configurator-viewer .render-bottom").attr("src", `https://raw.githubusercontent.com/ShadowProgr/kyuu-configurator/main/assets/case-bottom/${caseColor}.png?raw=true`);
    $(".configurator-viewer .render-top").attr("src", `https://raw.githubusercontent.com/ShadowProgr/kyuu-configurator/main/assets/case-top/${layout}-${caseColor}.png?raw=true`);

    // Badge
    if (!$("input[type='radio'][name='grp-badge-color']:checked").length)
        return;
    let badge = $("input[type='radio'][name='grp-badge-color']:checked").attr("id").replace("badge-", "");
    if (layout.includes("crane")) {
        badge = "crane-" + badge;
    } else if (layout.includes("flower")) {
        badge = "flower-" + badge;
    }
    $(".configurator-viewer .render-badge").attr("src", `https://raw.githubusercontent.com/ShadowProgr/kyuu-configurator/main/assets/badge/${badge}.png?raw=true`);

    // Weight
    if (!$("input[type='radio'][name='grp-weight-style']:checked").length ||
        !$("input[type='radio'][name='grp-weight-color']:checked").length)
        return;
    const weightStyle = $("input[type='radio'][name='grp-weight-style']:checked").attr("id");
    const weight = $("input[type='radio'][name='grp-weight-color']:checked").attr("id").replace("weight-", "");
    $(".configurator-viewer .render-weight").attr("src", `https://raw.githubusercontent.com/ShadowProgr/kyuu-configurator/main/assets/${weightStyle}/${weight}.png?raw=true`);

    // Subweight
    if (!$("input[type='radio'][name='grp-subweight-color']:checked").length)
        return;
    if (weightStyle.includes("hybrid")) {
        const subweight = $("input[type='radio'][name='grp-subweight-color']:checked").attr("id").replace("subweight-", "");
        $(".configurator-viewer .render-subweight").attr("src", `https://raw.githubusercontent.com/ShadowProgr/kyuu-configurator/main/assets/subweight/${subweight}.png?raw=true`);
        $(".configurator-viewer .render-subweight").show();
    } else {
        $(".configurator-viewer .render-subweight").hide();
    }

    // Plate
    if (!$("input[type='radio'][name='grp-plate-color']:checked").length)
        return;
    const plate = $("input[type='radio'][name='grp-plate-color']:checked").attr("id").replace("plate-", "");
    $(".configurator-viewer .render-plate").attr("src", `https://raw.githubusercontent.com/ShadowProgr/kyuu-configurator/main/assets/plate/${plate}.png?raw=true`);
};

function uncheckHidden() {
    $(".option-set span").filter(":hidden").find("input[type='radio']:checked").prop("checked", false);
}

function isValidSelection() {
    if (!$("input[type='radio'][name='grp-layout']:checked").length ||
        !$("input[type='radio'][name='grp-case-color']:checked").length ||
        !$("input[type='radio'][name='grp-badge-color']:checked").length ||
        !$("input[type='radio'][name='grp-weight-style']:checked").length ||
        !$("input[type='radio'][name='grp-weight-color']:checked").length ||
        !$("input[type='radio'][name='grp-plate-color']:checked").length) {
        $(".price-number").text("N/A");
        return false;
    }

    const weightStyle = $("input[type='radio'][name='grp-weight-style']:checked").attr("id");
    if (weightStyle.includes("hybrid") &&
        !$("input[type='radio'][name='grp-subweight-color']:checked").length) {
        $(".price-number").text("N/A");
        return false;
    }

    return true;
};

function updatePrice() {
    if (!isValidSelection())
        return;

    let price = 0;
    let temp = "";

    // Case
    const layout = $("input[type='radio'][name='grp-layout']:checked").attr("id").replace("case-", "");
    const caseColor = $("input[type='radio'][name='grp-case-color']:checked").attr("id").replace("case-", "");
    let caseFinish = "";
    if (layout.includes("crane") || layout.includes("flower") || caseColor.includes("alu")) {
        if (caseColor.includes("alu-e")) {
            caseFinish = "alu-ecoat";
        } else {
            caseFinish = "alu-anode";
        }
    } else if (caseColor.includes("pc")) {
        caseFinish = "pc";
    } else {
        caseFinish = caseColor;
    }
    price += parseInt(prices[`${layout}-${caseFinish}`]);
    temp += parseInt(prices[`${layout}-${caseFinish}`]) + " ";

    // Badge
    const badge = $("input[type='radio'][name='grp-badge-color']:checked").attr("id").replace("badge-", "");
    let badgeFinish = "";
    if (badge.includes("alu")) {
        if (badge.includes("alu-e")) {
            badgeFinish = "alu-ecoat";
        } else {
            badgeFinish = "alu-anode";
        }
    } else if (badge.includes("pc")) {
        badgeFinish = "pc";
    } else {
        badgeFinish = badge;
    }
    if (layout.includes("crane")) {
        badgeFinish = "crane-" + badgeFinish;
    } else if (layout.includes("flower")) {
        badgeFinish = "flower-" + badgeFinish;
    }
    price += parseInt(prices[`badge-${badgeFinish}`]);
    temp += parseInt(prices[`badge-${badgeFinish}`]) + " ";

    // Weight
    const weightStyle = $("input[type='radio'][name='grp-weight-style']:checked").attr("id");
    const weight = $("input[type='radio'][name='grp-weight-color']:checked").attr("id").replace("weight-", "");
    let weightFinish = "";
    if (weight.includes("alu")) {
        if (weight.includes("alu-e")) {
            weightFinish = "alu-ecoat";
        } else {
            weightFinish = "alu-anode";
        }
    } else if (weight.includes("pc")) {
        weightFinish = "pc";
    } else {
        weightFinish = weight;
    }
    price += parseInt(prices[`${weightStyle}-${weightFinish}`]);
    temp += parseInt(prices[`${weightStyle}-${weightFinish}`]) + " ";

    // Subweight
    if (weightStyle.includes("hybrid") &&
        $("input[type='radio'][name='grp-subweight-color']:checked").length) {
        const subweight = $("input[type='radio'][name='grp-subweight-color']:checked").attr("id").replace("subweight-", "");

        let subweightFinish = "";
        if (subweight.includes("alu")) {
            if (subweight.includes("alu-e")) {
                subweightFinish = "alu-ecoat";
            } else {
                subweightFinish = "alu-anode";
            }
        } else {
            subweightFinish = "pc";
        }
        price += parseInt(prices[`subweight-${subweightFinish}`]);
        temp += parseInt(prices[`subweight-${subweightFinish}`]) + " ";
    }

    // Plate
    const plate = $("input[type='radio'][name='grp-plate-color']:checked").attr("id").replace("plate-", "");
    let plateFinish = "";
    if (plate.includes("alu")) {
        if (plate.includes("alu-e")) {
            plateFinish = "alu-ecoat";
        } else {
            plateFinish = "alu-anode";
        }
    } else if (plate.includes("pc")) {
        plateFinish = "pc";
    } else if (plate.includes("pom")) {
        plateFinish = "pom";
    } else {
        plateFinish = plate;
    }
    price += parseInt(prices[`plate-${plateFinish}`]);
    temp += parseInt(prices[`plate-${plateFinish}`]) + " ";

    // PCB
    const pcb = $("input[type='radio'][name='grp-pcb']:checked").attr("id");

    price += parseInt(prices[`${pcb}`]);
    temp += parseInt(prices[`${pcb}`]) + " ";

    $(".price-number").text(price.toLocaleString(undefined));
    // $(".price-number").text(temp);
};

function getConfigString() {
    if (!isValidSelection())
        return "";

    const layout = $("input[type='radio'][name='grp-layout']:checked").attr("id").replace("case-", "");
    const caseColor = $("input[type='radio'][name='grp-case-color']:checked").attr("id").replace("case-", "");
    const badge = $("input[type='radio'][name='grp-badge-color']:checked").attr("id").replace("badge-", "");
    const weightStyle = $("input[type='radio'][name='grp-weight-style']:checked").attr("id");
    const weight = $("input[type='radio'][name='grp-weight-color']:checked").attr("id").replace("weight-", "");

    let configString = `Case: ${layout}-${caseColor}\<br>Badge: ${badge}\<br>Weight: ${weight}\<br>`;
    if (weightStyle.includes("hybrid")) {
        const subweight = $("input[type='radio'][name='grp-subweight-color']:checked").attr("id").replace("subweight-", "");
        configString += `Subweight: ${subweight}\<br>`;
    }
    const plate = $("input[type='radio'][name='grp-plate-color']:checked").attr("id").replace("plate-", "");
    configString += `Plate: ${plate}<br>`;

    const pcb = $("input[type='radio'][name='grp-pcb']:checked").attr("id").replace("plate-", "");
    configString += `PCB: ${pcb}`;

    return configString;
};

$(document).ready(function() {
    $("input[name='grp-layout']").change(function() {
        const id = $("input[type='radio'][name='grp-layout']:checked").attr("id");

        if (id.includes("crane") || id.includes("flower")) {
            $(".grp-case-material span:not(.case-alu)").fadeOut("fast");
            $(".grp-badge-material span:not(.crane)").fadeOut("fast");
            $(".grp-badge-color span:not(.crane)").fadeOut("fast");
        } else {
            $(".grp-case-material .case-pc").fadeIn("fast");
            $(".grp-badge-material .kyuu").fadeIn("fast");
            if (id.includes("wkl")) {
                $(".grp-case-material .case-copper").fadeOut("fast");
            } else {
                $(".grp-case-material .case-copper").fadeIn("fast");
            }
        }
        updateRenders();
        updatePrice();
    });

    $("input[name='grp-case-material']").change(function() {
        const id = $("input[type='radio'][name='grp-case-material']:checked").attr("id");

        if (id.includes("alu")) {
            $(".grp-case-color span:not(.case-alu-color)").fadeOut("fast");
            $(".grp-case-color .case-alu-color").fadeIn("fast");
        } else if (id.includes("pc")) {
            $(".grp-case-color span:not(.case-pc-color)").fadeOut("fast");
            $(".grp-case-color .case-pc-color").fadeIn("fast");
        } else {
            $(".grp-case-color span:not(.case-copper-color)").fadeOut("fast");
            $(".grp-case-color .case-copper-color").fadeIn("fast");
        }
        updateRenders();
        updatePrice();
    });

    $("input[name='grp-case-color']").change(function() {
        updateRenders();
        updatePrice();
    });

    $("input[name='grp-badge-material']").change(function() {
        const id = $("input[type='radio'][name='grp-badge-material']:checked").attr("id");

        if (id.includes("alu")) {
            $(".grp-badge-color span:not(.badge-alu-color)").fadeOut("fast");
            $(".grp-badge-color .badge-alu-color").fadeIn("fast");
        } else if (id.includes("pc")) {
            $(".grp-badge-color span:not(.badge-pc-color)").fadeOut("fast");
            $(".grp-badge-color .badge-pc-color").fadeIn("fast");
        } else if (id.includes("brass")) {
            const layout = $("input[type='radio'][name='grp-layout']:checked").attr("id");
            if (layout.includes("crane") || layout.includes("flower")) {
                $(".grp-badge-color .crane").fadeIn("fast");
            } else {
                $(".grp-badge-color .badge-brass-color").fadeIn("fast");
            }
            $(".grp-badge-color span:not(.badge-brass-color)").fadeOut("fast");
        } else if (id.includes("copper")) {
            $(".grp-badge-color span:not(.badge-copper-color)").fadeOut("fast");
            $(".grp-badge-color .badge-copper-color").fadeIn("fast");
        } else {
            $(".grp-badge-color span:not(.badge-ss-color)").fadeOut("fast");
            $(".grp-badge-color .badge-ss-color").fadeIn("fast");
        }
        updateRenders();
        updatePrice();
    });

    $("input[name='grp-badge-color']").change(function() {
        updateRenders();
        updatePrice();
    });

    $("input[name='grp-weight-style']").change(function() {
        const id = $("input[type='radio'][name='grp-weight-style']:checked").attr("id");

        if (id == "weight-regular") {
            $(".grp-subweight-material").fadeOut("fast");
            $(".grp-subweight-color").fadeOut("fast");
            $(".weight-hybrid-color").fadeOut("fast");
        } else {
            $(".grp-subweight-material").fadeIn("fast");
            $(".grp-subweight-color").fadeIn("fast");
            if ($("input[type='radio'][name='grp-weight-material']:checked").length && $("input[type='radio'][name='grp-weight-material']:checked").attr("id").includes("brass")) {
                $(".weight-hybrid-color").fadeIn("fast");
            }
        }
        updateRenders();
        updatePrice();
    });

    $("input[name='grp-weight-material']").change(function() {
        const id = $("input[type='radio'][name='grp-weight-material']:checked").attr("id");

        if (id.includes("alu")) {
            $(".grp-weight-color span:not(.weight-alu-color)").fadeOut("fast");
            $(".grp-weight-color .weight-alu-color").fadeIn("fast");
        } else if (id.includes("pc")) {
            $(".grp-weight-color span:not(.weight-pc-color)").fadeOut("fast");
            $(".grp-weight-color .weight-pc-color").fadeIn("fast");
        } else if (id.includes("brass")) {
            $(".grp-weight-color span:not(.weight-brass-color)").fadeOut("fast");
            if ($("input[type='radio'][name='grp-weight-style']:checked").attr("id") == "weight-regular") {
                $(".grp-weight-color .weight-brass-color:not(.weight-hybrid-color)").fadeIn("fast");
            } else {
                $(".grp-weight-color .weight-brass-color").fadeIn("fast");
            }
        } else if (id.includes("copper")) {
            $(".grp-weight-color span:not(.weight-copper-color)").fadeOut("fast");
            $(".grp-weight-color .weight-copper-color").fadeIn("fast");
        } else {
            $(".grp-weight-color span:not(.weight-ss-color)").fadeOut("fast");
            $(".grp-weight-color .weight-ss-color").fadeIn("fast");
        }
        updateRenders();
        updatePrice();
    });

    $("input[name='grp-weight-color']").change(function() {
        updateRenders();
        updatePrice();
    });

    $("input[name='grp-subweight-material']").change(function() {
        const id = $("input[type='radio'][name='grp-subweight-material']:checked").attr("id");

        if (id.includes("alu")) {
            $(".grp-subweight-color span:not(.subweight-alu-color)").fadeOut("fast");
            $(".grp-subweight-color .subweight-alu-color").fadeIn("fast");
        } else {
            $(".grp-subweight-color span:not(.subweight-pc-color)").fadeOut("fast");
            $(".grp-subweight-color .subweight-pc-color").fadeIn("fast");
        }
        updateRenders();
        updatePrice();
    });

    $("input[name='grp-subweight-color']").change(function() {
        updateRenders();
        updatePrice();
    });

    $("input[name='grp-plate-material']").change(function() {
        const id = $("input[type='radio'][name='grp-plate-material']:checked").attr("id");

        if (id.includes("alu")) {
            $(".grp-plate-color span:not(.plate-alu-color)").fadeOut("fast");
            $(".grp-plate-color .plate-alu-color").fadeIn("fast");
        } else if (id.includes("pc")) {
            $(".grp-plate-color span:not(.plate-pc-color)").fadeOut("fast");
            $(".grp-plate-color .plate-pc-color").fadeIn("fast");
        } else if (id.includes("brass")) {
            $(".grp-plate-color span:not(.plate-brass-color)").fadeOut("fast");
            $(".grp-plate-color .plate-brass-color").fadeIn("fast");
        } else if (id.includes("copper")) {
            $(".grp-plate-color span:not(.plate-copper-color)").fadeOut("fast");
            $(".grp-plate-color .plate-copper-color").fadeIn("fast");
        } else {
            $(".grp-plate-color span:not(.plate-pom-color)").fadeOut("fast");
            $(".grp-plate-color .plate-pom-color").fadeIn("fast");
        }
        updateRenders();
        updatePrice();
    });

    $("input[name='grp-plate-color']").change(function() {
        updateRenders();
        updatePrice();
    });

    $("input[name='grp-pcb']").change(function() {
        updateRenders();
        updatePrice();
    });

    $("#my-form").submit(function(e) {
        e.preventDefault();
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (vnf_regex.test($("#phone").val()) == false) {
            alert("Số điện thoại không đúng");
            return false;
        }

        $.ajax({
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'jsonp',
            url: 'https://docs.google.com/forms/d/e/1FAIpQLScllOJiLhel6EFgLlpPz0n6EA2mOx8ptSvU4O9-6fZEFRG2ZQ/formResponse',
            data: {
                "entry.1238286296": $("#name").val(),
                "entry.426016844": $("#phone").val(),
                "entry.301433428": $("#fb").val(),
                "entry.511429316": $("#address").val(),
                "entry.924331765": $("#price").val(),
                "entry.1059748155": $("#config").val(),
            },
            success: function(result) {
                console.log(result);
            },
            error: function(result) {
                console.log(result);
                $("#form").fadeOut("fast", function() {
                    $("#message .price").text($(".price-number").text() + " ₫");
                    $("#message").fadeIn("fast");
                });
            }
        });
        return false;
    });

    $(".open-form").on("click", function(e) {
        uncheckHidden();
        if (isValidSelection()) {
            $("#name").val("");
            $("#phone").val("");
            $("#fb").val("");
            $("#address").val("");
            $("#price").val("");
            $("#config").val("");
            $("#price-display").text($(".price-number").text() + " ₫");
            $("#config-display").html(getConfigString());

            $("#price").val($(".price-number").text());
            $("#config").val(getConfigString());
            $("#form").fadeIn("fast");
        } else {
            alert("Vui lòng chọn đủ option");
        }
    });

    $("#form .close-form").on("click", function(e) {
        $("#form").fadeOut("fast");
    });

    $("#message .close-form").on("click", function(e) {
        $("#message").fadeOut("fast");
    });

    $("input[name='grp-layout'][id='wkl']").prop("checked", true).change();
    $("input[name='grp-case-material'][id='case-alu']").prop("checked", true).change();
    $("input[name='grp-case-color'][id='case-alu-ewhite']").prop("checked", true).change();
    $("input[name='grp-badge-material'][id='badge-alu']").prop("checked", true).change();
    $("input[name='grp-badge-color'][id='badge-alu-eblack']").prop("checked", true).change();
    $("input[name='grp-weight-style'][id='weight-hybrid']").prop("checked", true).change();
    $("input[name='grp-weight-material'][id='weight-alu']").prop("checked", true).change();
    $("input[name='grp-weight-color'][id='weight-alu-eblack']").prop("checked", true).change();
    $("input[name='grp-subweight-material'][id='subweight-alu']").prop("checked", true).change();
    $("input[name='grp-subweight-color'][id='subweight-alu-ewhite']").prop("checked", true).change();
    $("input[name='grp-plate-material'][id='plate-pom']").prop("checked", true).change();
    $("input[name='grp-plate-color'][id='plate-pom-black']").prop("checked", true).change();
    $("input[name='grp-pcb'][id='pcb-solder']").prop("checked", true).change();
});