import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./app-header";
import "./app.scss";
import Home from "../components/home/home";
import NewStaffRequirement from "../components/new_staff_requeriment/NewStaffRequirement";
import NewStaffRequirementForm from "../components/new_staff_requirement_form/NewStaffRequirementForm";
import NewSalaryAdjusment from "../components/new_salary_adjusment/NewSalaryAdjusment";
import CourseStaffRequirement from "../components/staff_requirement_course/CourseStaffRequirement";
import OrganizationalChange from "../components/organizational_change/OrganizationalChange";
import CourseSalaryAdjusment from "../components/salary_adjusment_course/CourseSalaryAdjusment";

import {
  Content,
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
} from "carbon-components-react/lib/components/UIShell";
import { useDispatch, useSelector } from "react-redux";
import {
  getTokenAction,
  loadUserAction,
  refreshTokenAction,
} from "../authentication/auth-actions";
import { checkTokenExpired } from "../utils/check-expired";
import { getCode } from "../utils/get-code";
import { URL_LOGIN } from "../authentication/constants";
import PageNotFound from "../errors/page-not-found";
import ControlPanelStaff from "../components/control_panel_staff/ControlPanelStaff";
import BolivianBonus from "../components/bolivian_bonus/BolivianBonus";
import SalaryAdjusmentChart from "../components/charts/SalaryAdjusmentChart";
import SalaryAdjusmentAction from "../components/salary_adjusment_action/SalaryAdjusmentAction";
import OrganizationalChangeAction from "../components/salary_adjusment_action/OrganizationalChangeAction";
import SalaryAdjusmentActionBolivian from "../components/salary_adjusment_action/SalaryAdjusmentActionBolivian";
import ControlPanelStaffParcial from "../components/control_panel_staff_parcial/ControlPanelStaffParcial";
import ChartStaffRequirement from "../components/staff_requirement_chart/ChartStaffRequirement";
import ConfigRequirement from "../components/config_requirement/ConfigRequirement";
//import SearchStatusStaffRequirement from "../components/search/SearchStatusStaffRequirement/SearchStatusStaffRequirement";


function App() {
  const dispatch = useDispatch();
  const isAunthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [sideNav, setSideNav] = useState();
  useEffect(() => {
    async function load() {
      let code = await getCode();

      if (!localStorage.getItem("tokenId")) {
        await dispatch(getTokenAction(code));
      }

      if (checkTokenExpired()) {
        await dispatch(refreshTokenAction());
      }

      await dispatch(loadUserAction());

      if (
        !localStorage.getItem("tokenId") &&
        !localStorage.getItem("tokenRefresh")
      ) {
        window.location.assign(`${URL_LOGIN}`);
        return null;
      }
    }
    //load();
    //eslint-disable-next-line
  }, []);

  if (/*isAunthenticated*/ true) {
    return (
      <Fragment>
        <Router>

          <Header
            titulo="PORTAL DE GESTION HUMANA CORPORATIVA"
            setSideNav={setSideNav}
          />
          <Header titulo="PORTAL DE GESTIÓN HUMANA CORPORATIVA" setSideNav={setSideNav} />
          <SideNav
            className={sideNav}
            isFixedNav
            expanded={true}
            isChildOfHeader={true}
            aria-label="Side navigation"
          >
            <SideNavItems
              mode="inline"
              defaultSelectedKeys={["0"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SideNavMenu title="Requerimiento de Personal">
                <SideNavMenuItem href="/requerimiento-personal">
                  Crear Solicitud
                </SideNavMenuItem>
                <SideNavMenuItem href="/requerimiento-personal-bandeja">
                  Solicitudes en Curso
                </SideNavMenuItem>
                <SideNavMenuItem href="/tablero-control-persona">
                  Tablero de Control
                </SideNavMenuItem>
                <SideNavMenuItem href="/tablero-control-persona-parcial">
                  Tablero de Control Parcial - RP
                </SideNavMenuItem>
                <SideNavMenuItem href="/grafico-persona">
                  Gráficos - RP
                </SideNavMenuItem>
                <SideNavMenuItem href="/configuracion_requerimiento">
                  Configuración
                </SideNavMenuItem>
              </SideNavMenu>

              <SideNavMenu title="Solicitudes de Revision Salarial y Cambios Organizacionales">
                <SideNavMenuItem href="/ajuste-salarial">
                  Revisión Ajuste Salarial
                </SideNavMenuItem>
                <SideNavMenuItem href="/cambios-organizacional">
                  Cambios Organizacionales
                </SideNavMenuItem>
                <SideNavMenuItem href="/indicadores-ajuste-salarial">
                  Indicadores
                </SideNavMenuItem>
                {/*<SideNavMenuItem href="/bonos-paises">
                  Bonos Países
                </SideNavMenuItem>*/}
                <SideNavMenuItem href="/ajuste-salarial-bandeja">
                  Estado de  Solicitudes
                </SideNavMenuItem>
                <SideNavMenuItem href="/pendientes-ajuste-salarial">
                  Pendientes A.S
                </SideNavMenuItem>
                <SideNavMenuItem href="/pendientes-cambios-organizacionales">
                  Pendientes C.O
                </SideNavMenuItem>
                <SideNavMenuItem href="/buscar-solicitudes">
                  Requerimientos de Personal
                </SideNavMenuItem>



              </SideNavMenu>
            </SideNavItems>
          </SideNav>
          <Content>
            <Switch>
              <Route default exact path="/" component={Home} />
              <Route
                path="/requerimiento-personal"
                component={NewStaffRequirement}
              />
              <Route
                path={"/requerimiento-personal-bandeja/:id"}
                component={NewStaffRequirementForm}
              />
              <Route path="/ajuste-salarial" component={NewSalaryAdjusment} />
              <Route
                path="/cambios-organizacional"
                component={OrganizationalChange}
              />
              <Route path="/bonos-paises" component={BolivianBonus} />
              <Route
                path="/requerimiento-personal-bandeja"
                component={CourseStaffRequirement}
              />
              <Route
                path="/ajuste-salarial-bandeja"
                component={CourseSalaryAdjusment}
              />
              <Route
                path="/tablero-control-persona"
                component={ControlPanelStaff}
              />
              <Route
                path="/indicadores-ajuste-salarial"
                component={SalaryAdjusmentChart}
              ></Route>
              <Route
                path="/tablero-control-persona"
                component={ControlPanelStaff}
              />
              <Route
                path="/pendientes-ajuste-salarial"
                component={SalaryAdjusmentAction}
              />
              <Route
                path="/pendientes-ajuste-salarial-bolivia"
                component={SalaryAdjusmentActionBolivian}
              />
              <Route
                path="/pendientes-cambios-organizacionales"
                component={OrganizationalChangeAction}
              /><Route
                path="/tablero-control-persona-parcial"
                component={ControlPanelStaffParcial}
              />
              <Route
                path="/grafico-persona"
                component={ChartStaffRequirement}
              />
              <Route
                path="/configuracion_requerimiento"
                component={ConfigRequirement}
              />
              {/* <Route
                path="/buscar-solicitudes"
                component={SearchStatusStaffRequirement}
              /> */}
              

              <Route component={PageNotFound} />
            </Switch>
          </Content>
        </Router>
      </Fragment>
    );
  } else {
    return null;
  }
}

export default App;